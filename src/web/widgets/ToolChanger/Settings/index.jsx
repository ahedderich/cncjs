import styled from 'styled-components';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Dropdown, MenuItem } from 'react-bootstrap';
import uniqueId from 'lodash/uniqueId';
import ReactDOM from 'react-dom';
import Modal from '../../../components/Modal';
import Space from '../../../components/Space';
import api from '../../../api';
import { Nav, NavItem } from '../../../components/Navs';
import i18n from '../../../lib/i18n';
import { Form, Textarea } from '../../../components/Validation';
import Tools from './Tools';
import styles from './form.styl';
import variables from '../variables';
import insertAtCaret from '../../Macro/insertAtCaret';

const TabContent = styled.div`
    padding: 10px 15px;
    min-height: 240px;
`;

const TabPane = styled.div`
    display: ${props => (props.active ? 'block' : 'none')};
`;

class Settings extends PureComponent {
    static propTypes = {
        config: PropTypes.object,
        onCancel: PropTypes.func,
        onSave: PropTypes.func
    };
    static defaultProps = {
        config: PropTypes.object,
        onCancel: noop,
        onSave: noop
    };

    config = this.props.config;
    fields = {
        loadToolMacro: null,
        unloadToolMacro: null
    };
    tools = null;
    state = {
        activeKey: 'general'
    };

    load = () => {
        return {
            loadToolMacro: this.config.get('loadToolMacro'),
            unloadToolMacro: this.config.get('unloadToolMacro')
        };
    };
    save = () => {
        const { records } = this.tools.state;
        api.tools.bulkUpdate({ records: records })
            .then(() => {
                // TODO
            })
            .catch(() => {
                // TODO
            });
        const loadToolMacro = this.fields.loadToolMacro.value;
        const unloadToolMacro = this.fields.unloadToolMacro.value;
        this.config.set('loadToolMacro', loadToolMacro);
        this.config.set('unloadToolMacro', unloadToolMacro);
    };


    render() {
        const {
            loadToolMacro,
            unloadToolMacro
        } = this.load();

        return (
            <Modal size="md" onClose={this.props.onCancel}>
                <Modal.Header>
                    <Modal.Title>{i18n._('Settings')}</Modal.Title>
                </Modal.Header>
                <Modal.Body padding={false}>
                    <Nav
                        navStyle="tabs"
                        activeKey={this.state.activeKey}
                        onSelect={eventKey => {
                            this.setState({ activeKey: eventKey });
                        }}
                        style={{
                            marginTop: 15,
                            paddingLeft: 15
                        }}
                    >
                        <NavItem eventKey="general">{i18n._('General')}</NavItem>
                        <NavItem eventKey="tools">{i18n._('Tools')}</NavItem>
                    </Nav>
                    <TabContent>
                        <TabPane active={this.state.activeKey === 'general'}>
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
                                        <label>{i18n._('Load Tool Macro')}</label>
                                        <Dropdown
                                            id="add-macro-dropdown"
                                            className="pull-right"
                                            onSelect={(eventKey) => {
                                                const textarea = ReactDOM.findDOMNode(this.fields.loadToolMacro).querySelector('textarea');
                                                if (textarea) {
                                                    insertAtCaret(textarea, eventKey);
                                                }
                                            }}
                                            pullRight
                                        >
                                            <Dropdown.Toggle
                                                className={styles.btnLink}
                                                style={{ boxShadow: 'none' }}
                                                useAnchor
                                                noCaret
                                            >
                                                <i className="fa fa-plus" />
                                                <Space width="8" />
                                                {i18n._('Macro Variables')}
                                                <Space width="4" />
                                                <i className="fa fa-caret-down" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className={styles.macroVariablesDropdown}>
                                                {variables.map(v => {
                                                    if (typeof v === 'object') {
                                                        return (
                                                            <MenuItem
                                                                header={v.type === 'header'}
                                                                key={uniqueId()}
                                                            >
                                                                {v.text}
                                                            </MenuItem>
                                                        );
                                                    }

                                                    return (
                                                        <MenuItem
                                                            eventKey={v}
                                                            key={uniqueId()}
                                                        >
                                                            {v}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Textarea
                                            ref={node => {
                                                this.fields.loadToolMacro = node;
                                            }}
                                            rows="10"
                                            name="loadToolMacro"
                                            value={loadToolMacro}
                                            className={cx(
                                                'form-control',
                                                styles.formControl,
                                                styles.long
                                            )}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>{i18n._('Unload Tool Macro')}</label>
                                        <Dropdown
                                            id="add-macro-dropdown"
                                            className="pull-right"
                                            onSelect={(eventKey) => {
                                                const textarea = ReactDOM.findDOMNode(this.fields.unloadToolMacro).querySelector('textarea');
                                                if (textarea) {
                                                    insertAtCaret(textarea, eventKey);
                                                }
                                            }}
                                            pullRight
                                        >
                                            <Dropdown.Toggle
                                                className={styles.btnLink}
                                                style={{ boxShadow: 'none' }}
                                                useAnchor
                                                noCaret
                                            >
                                                <i className="fa fa-plus" />
                                                <Space width="8" />
                                                {i18n._('Macro Variables')}
                                                <Space width="4" />
                                                <i className="fa fa-caret-down" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className={styles.macroVariablesDropdown}>
                                                {variables.map(v => {
                                                    if (typeof v === 'object') {
                                                        return (
                                                            <MenuItem
                                                                header={v.type === 'header'}
                                                                key={uniqueId()}
                                                            >
                                                                {v.text}
                                                            </MenuItem>
                                                        );
                                                    }

                                                    return (
                                                        <MenuItem
                                                            eventKey={v}
                                                            key={uniqueId()}
                                                        >
                                                            {v}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Textarea
                                            ref={node => {
                                                this.fields.unloadToolMacro = node;
                                            }}
                                            rows="10"
                                            name="unloadToolMacro"
                                            value={unloadToolMacro}
                                            className={cx(
                                                'form-control',
                                                styles.formControl,
                                                styles.long
                                            )}
                                        />
                                    </div>
                                </div>
                            </Form>
                        </TabPane>
                        <TabPane active={this.state.activeKey === 'tools'}>
                            <Tools
                                ref={node => {
                                    this.tools = node;
                                }}
                            />
                        </TabPane>
                    </TabContent>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={this.props.onCancel}
                    >
                        {i18n._('Cancel')}
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={event => {
                            this.save();

                            // Update parent state
                            this.props.onSave(event);
                        }}
                    >
                        {i18n._('Save Changes')}
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Settings;
