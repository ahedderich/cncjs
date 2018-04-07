import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Modal from '../../../../components/Modal';
import Space from '../../../../components/Space';
import { ToastNotification } from '../../../../components/Notifications';
import { Form, Input } from '../../../../components/Validation';
import i18n from '../../../../lib/i18n';
import * as validations from '../../../../lib/validations';
import styles from '../form.styl';

class UpdateRecord extends PureComponent {
    static propTypes = {
        state: PropTypes.object,
        action: PropTypes.object
    };

    useZOffset: null;

    get value() {
        const {
            name,
            number,
            zOffset
        } = this.form.getValues();

        return {
            name: name,
            number: number,
            zOffset: zOffset,
            useZOffset: this.useZOffset.checked
        };
    }
    render() {
        const { state, action } = this.props;
        const { modal } = state;
        const {
            alertMessage,
            name,
            number,
            zOffset,
            useZOffset
        } = modal.params;

        return (
            <Modal
                disableOverlay
                size="sm"
                onClose={action.closeModal}
            >
                <Modal.Header>
                    <Modal.Title>
                        {i18n._('Tool')}
                        <Space width="8" />
                        &rsaquo;
                        <Space width="8" />
                        {i18n._('Update')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alertMessage &&
                    <ToastNotification
                        style={{ margin: '-16px -24px 10px -24px' }}
                        type="error"
                        onDismiss={() => {
                            action.updateModalParams({ alertMessage: '' });
                        }}
                    >
                        {alertMessage}
                    </ToastNotification>
                    }
                    <Form
                        ref={node => {
                            this.form = node;
                        }}
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                    >
                        <div className={styles.formFields}>
                            <div className={styles.formGroup}>
                                <label>{i18n._('Name')}</label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={name}
                                    className={cx(
                                        'form-control',
                                        styles.formControl,
                                        styles.short
                                    )}
                                    validations={[validations.required]}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>{i18n._('Toolnumber')}</label>
                                <Input
                                    type="number"
                                    name="number"
                                    value={number}
                                    className={cx(
                                        'form-control',
                                        styles.formControl,
                                        styles.short
                                    )}
                                    validations={[validations.required]}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>
                                    <input
                                        ref={node => {
                                            this.useZOffset = node;
                                        }}
                                        type="checkbox"
                                        defaultChecked={useZOffset}
                                    />
                                    <Space width="8" />
                                    {i18n._('Use Static Z Offset')}
                                </label>
                            </div>
                            <div className={styles.formGroup}>
                                <label>{i18n._('Static Z Offset')}</label>
                                <Input
                                    type="number"
                                    name="zOffset"
                                    value={zOffset}
                                    className={cx(
                                        'form-control',
                                        styles.formControl,
                                        styles.short
                                    )}
                                />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={action.closeModal}
                    >
                        {i18n._('Cancel')}
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            this.form.validate(err => {
                                if (err) {
                                    return;
                                }

                                const { id } = modal.params;
                                const { name, number, zOffset, useZOffset } = this.value;

                                action.updateRecord(id, { name, number, zOffset, useZOffset });
                            });
                        }}
                    >
                        {i18n._('OK')}
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default UpdateRecord;
