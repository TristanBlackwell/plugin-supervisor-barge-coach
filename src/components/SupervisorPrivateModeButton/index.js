import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTheme } from '@twilio/flex-ui';

import { Actions as BargeCoachStatusAction } from '../../states/BargeCoachState';
import { localCacheClient } from '../../services';
import SupervisorPrivateModeButtonComponent from './SupervisorPrivateModeButton.Component';

const mapStateToProps = (state) => {
  const agentWorkerSID = state?.flex?.supervisor?.stickyWorker?.worker?.sid;
  const supervisorFN = state?.flex?.worker?.attributes?.full_name;

  const customReduxStore = state?.['barge-coach'].bargecoach;
  const { coaching } = customReduxStore;
  const { coachingStatusPanel } = customReduxStore;

  /*
   * Storing the coachingStatusPanel value that will be used in SupervisorBargePlugin.js
   * If the supervisor refreshes, we want to remember their preference
   */
  localCacheClient.setPrivateToggle(coachingStatusPanel);

  return {
    agentWorkerSID,
    supervisorFN,
    coaching,
    coachingStatusPanel,
  };
};

/*
 * Mapping dispatch to props as I will leverage the setBargeCoachStatus
 * to change the properties on the redux store, referenced above with this.props.setBargeCoachStatus
 */
const mapDispatchToProps = (dispatch) => ({
  setBargeCoachStatus: bindActionCreators(BargeCoachStatusAction.setBargeCoachStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SupervisorPrivateModeButtonComponent));
