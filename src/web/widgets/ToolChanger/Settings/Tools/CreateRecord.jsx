import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Modal from '../../../../components/Modal';
import Space from '../../../../components/Space';
import { ToastNotification } from '../../../../components/Notifications';
import { Form, Input } from '../../../../components/Validation';
import i18n from '../../../../lib/i18n';
import * as validations from '../../../../lib/validations';
import styles from '../form.styl';

class CreateRecord extends PureComponent {
    static propTypes = {
        state: PropTypes.object,
        action: PropTypes.object
    };

    get value() {
        const {
            name,
            number,
            zOffset,
            pickupX,
            pickupY,
            pickupZ
        } = this.form.getValues();

        return {
            name: name,
            number: number,
            zOffset: zOffset,
            pickupX: pickupX,
            pickupY: pickupY,
            pickupZ: pickupZ
        };
    }
    render() {
        const { state, action } = this.props;
        const { modal } = state;
        const { alertMessage } = modal.params;

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
                        {i18n._('New')}
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
                                    value=""
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
                                    value=""
                                    className={cx(
                                        'form-control',
                                        styles.formControl,
                                        styles.short
                                    )}
                                    validations={[validations.required]}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>{i18n._('Static Z Offset')}</label>
                                <Input
                                    type="number"
                                    name="zOffset"
                                    value=""
                                    className={cx(
                                        'form-control',
                                        styles.formControl,
                                        styles.short
                                    )}
                                />
                            </div>
                            <b>{i18n._('Pickup Location')}</b>
                            <Container fluid>
                                <Row>
                                    <Col className="col-xs-3">
                                        <label>{i18n._('X')}</label>
                                        <Input
                                            type="number"
                                            name="pickupX"
                                            value=""
                                            className={cx(
                                                'form-control',
                                                styles.formControl,
                                                styles.short
                                            )}
                                        />
                                    </Col>
                                    <Col className="col-xs-3">
                                        <label>{i18n._('Y')}</label>
                                        <Input
                                            type="number"
                                            name="pickupY"
                                            value=""
                                            className={cx(
                                                'form-control',
                                                styles.formControl,
                                                styles.short
                                            )}
                                        />
                                    </Col>
                                    <Col className="col-xs-3">
                                        <label>{i18n._('Z')}</label>
                                        <Input
                                            type="number"
                                            name="pickupZ"
                                            value=""
                                            className={cx(
                                                'form-control',
                                                styles.formControl,
                                                styles.short
                                            )}
                                        />
                                    </Col>
                                </Row>
                            </Container>
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

                                const { name, number, zOffset, pickupX, pickupY, pickupZ } = this.value;
                                action.createRecord({ name, number, zOffset, pickupX, pickupY, pickupZ });
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

export default CreateRecord;
