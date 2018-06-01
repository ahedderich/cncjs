import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Space from '../../components/Space';
import { Button } from '../../components/Buttons';
import { Tooltip } from '../../components/Tooltip';

class ToolPanel extends PureComponent {
    static propTypes = {
        config: PropTypes.object,
        state: PropTypes.object,
        actions: PropTypes.object
    };

    renderToolButtons() {
        const { tools } = this.props.state;

        return tools.map(c => {
            return (
                <div key={c.id} style={{ padding: '0 4px', marginTop: 5 }}>
                    <Tooltip
                        placement="bottom"
                        content={(
                            <div className="text-left">
                                {c.name}
                            </div>
                        )}
                        enterDelay={1000}
                        hideOnClick
                    >
                        <Button
                            btnSize="sm"
                            btnStyle="flat"
                            style={{
                                minWidth: 'auto',
                                width: '100%',
                                textAlign: 'left'
                            }}
                        >
                            {c.number}:
                            <Space width="8" />
                            <small
                                style={{
                                    fontSize: '0.9em'
                                }}
                            >
                                {c.name}
                            </small>
                        </Button>
                    </Tooltip>
                </div>
            );
        });
    }
    render() {
        return (
            <div>
                {this.renderToolButtons()}
            </div>
        );
    }
}

export default ToolPanel;
