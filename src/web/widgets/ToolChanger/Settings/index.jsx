import styled from 'styled-components';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Modal from '../../../components/Modal';
import api from '../../../api';
import { Nav, NavItem } from '../../../components/Navs';
import i18n from '../../../lib/i18n';
import Tools from './Tools';

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
        title: null,
        url: null
    };
    tools = null;
    state = {
        activeKey: 'general'
    };

    load = () => {
        return {
            title: this.config.get('title'),
            url: this.config.get('url')
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
        const title = this.fields.title.value;
        this.config.set('title', title);
    };


    render() {
        const {
            title
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
                            <div className="form-group">
                                <label><strong>{i18n._('Title2')}</strong></label>
                                <div>
                                    <input
                                        ref={node => {
                                            this.fields.title = node;
                                        }}
                                        type="url"
                                        className="form-control"
                                        defaultValue={title}
                                        maxLength={256}
                                    />
                                </div>
                            </div>
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
