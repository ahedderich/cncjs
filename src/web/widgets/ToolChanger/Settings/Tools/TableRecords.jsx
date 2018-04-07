import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ButtonGroup, Button } from '../../../../components/Buttons';
import Space from '../../../../components/Space';
import Table from '../../../../components/Table';
import i18n from '../../../../lib/i18n';
import {
    MODAL_CREATE_RECORD,
    MODAL_UPDATE_RECORD
} from './constants';

class TableRecords extends PureComponent {
    static propTypes = {
        state: PropTypes.object,
        action: PropTypes.object
    };

    render() {
        const { state, action } = this.props;

        return (
            <Table
                bordered={false}
                justified={false}
                hoverable={false}
                maxHeight={300}
                useFixedHeader={true}
                data={(state.api.err || state.api.fetching) ? [] : state.records}
                rowKey={(record) => {
                    return record.id;
                }}
                emptyText={() => {
                    if (state.api.err) {
                        return (
                            <span className="text-danger">
                                {i18n._('An unexpected error has occurred.')}
                            </span>
                        );
                    }

                    if (state.api.fetching) {
                        return (
                            <span>
                                <i className="fa fa-fw fa-spin fa-circle-o-notch" />
                                <Space width="8" />
                                {i18n._('Loading...')}
                            </span>
                        );
                    }

                    return i18n._('No data to display');
                }}
                title={() => (
                    <div>
                        <button
                            type="button"
                            className="btn btn-default"
                            onClick={() => {
                                action.openModal(MODAL_CREATE_RECORD);
                            }}
                        >
                            <i className="fa fa-plus" />
                            <Space width="8" />
                            {i18n._('New')}
                        </button>
                    </div>
                )}
                columns={[
                    {
                        title: i18n._('Order'),
                        className: 'text-nowrap',
                        key: 'order',
                        width: 80,
                        render: (value, row, rowIndex) => (
                            <ButtonGroup>
                                <Button
                                    btnSize="xs"
                                    btnStyle="flat"
                                    compact
                                    disabled={rowIndex === 0}
                                    title={i18n._('Move Up')}
                                    onClick={() => {
                                        if (rowIndex > 0) {
                                            const from = rowIndex;
                                            const to = rowIndex - 1;
                                            action.moveRecord(from, to);
                                        }
                                    }}
                                >
                                    <i className="fa fa-fw fa-chevron-up" />
                                </Button>
                                <Button
                                    btnSize="xs"
                                    btnStyle="flat"
                                    compact
                                    disabled={rowIndex === (state.records.length - 1)}
                                    title={i18n._('Move Down')}
                                    onClick={() => {
                                        if (rowIndex < (state.records.length - 1)) {
                                            const from = rowIndex;
                                            const to = rowIndex + 1;
                                            action.moveRecord(from, to);
                                        }
                                    }}
                                >
                                    <i className="fa fa-fw fa-chevron-down" />
                                </Button>
                            </ButtonGroup>
                        )
                    },
                    {
                        title: i18n._('Name'),
                        className: 'text-nowrap',
                        key: 'name',
                        dataKey: 'name'
                    },
                    {
                        title: i18n._('Toolnumber'),
                        className: 'text-nowrap',
                        key: 'number',
                        dataKey: 'number'
                    },
                    {
                        title: i18n._('Use Z Offset'),
                        className: 'text-nowrap',
                        key: 'useZOffset',
                        dataKey: 'useZOffset',
                        render: (value, row, rowIndex) => {
                            if (value) {
                                return (
                                    <div>{row.zOffset}</div>
                                );
                            } else {
                                return (
                                    <div>-</div>
                                );
                            }
                        }
                    },
                    {
                        title: i18n._('Action'),
                        className: 'text-nowrap',
                        key: 'action',
                        width: 90,
                        render: (value, row, rowIndex) => (
                            <div>
                                <Button
                                    btnSize="xs"
                                    btnStyle="flat"
                                    compact
                                    title={i18n._('Update')}
                                    onClick={(event) => {
                                        action.openModal(MODAL_UPDATE_RECORD, row);
                                    }}
                                >
                                    <i className="fa fa-fw fa-edit" />
                                </Button>
                                <Button
                                    btnSize="xs"
                                    btnStyle="flat"
                                    compact
                                    title={i18n._('Remove')}
                                    onClick={(event) => {
                                        action.removeRecord(row.id);
                                    }}
                                >
                                    <i className="fa fa-fw fa-close" />
                                </Button>
                            </div>
                        )
                    }
                ]}
            />
        );
    }
}

export default TableRecords;
