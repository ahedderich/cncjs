import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Panel from '../../components/Panel';
import styles from './index.styl';
import i18n from '../../lib/i18n';

class ToolPanel extends PureComponent {
    static propTypes = {
        config: PropTypes.object,
        state: PropTypes.object,
        actions: PropTypes.object
    };


    render() {
        const { state } = this.props;

        return (
            <Panel className={styles.panel}>
                <Panel.Heading className={styles['panel-heading']}>
                    {i18n._('Status')}
                </Panel.Heading>
                <Panel.Body>
                    <div className="row no-gutters">
                        <div className="col col-xs-4">
                            <div className={styles.textEllipsis} title={i18n._('State')}>
                                {i18n._('State')}
                            </div>
                        </div>
                        <div className="col col-xs-8">
                            <div className={styles.well}>
                                {i18n._('Changing Tool')}
                            </div>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col col-xs-4">
                            <div className={styles.textEllipsis} title={i18n._('Active Tool')}>
                                {i18n._('Active Tool')}
                            </div>
                        </div>
                        <div className="col col-xs-8">
                            <div className={styles.well}>
                                {state.currentToolNumber} -&gt; 2
                            </div>
                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}

export default ToolPanel;
