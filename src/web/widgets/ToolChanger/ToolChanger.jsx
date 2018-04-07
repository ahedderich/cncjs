import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import i18n from '../../lib/i18n';
import styles from './index.styl';
import ToolPanel from './ToolPanel';
import ToolChangerState from './ToolChangerState';

class ToolChanger extends PureComponent {
    static propTypes = {
        state: PropTypes.object,
        config: PropTypes.object,
        actions: PropTypes.object,
        disabled: PropTypes.bool
    };

    render() {
        const { disabled, state, config, actions } = this.props;

        if (disabled) {
            return (
                <div className={styles.inactiveContent}>
                    {i18n._('Tool Changer disabled')}
                </div>
            );
        }

        console.log(state.tools);
        return (
            <div className={styles.activeContent}>
                <ToolChangerState config={config} state={state} actions={actions} />
                <ToolPanel config={config} state={state} actions={actions} />
            </div>
        );
    }
}

export default ToolChanger;
