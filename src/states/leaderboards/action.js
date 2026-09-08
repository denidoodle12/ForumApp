import api from '../../api/dicodingForum';
import {
  showLoadingActionCreator,
  hideLoadingActionCreator,
} from '../loadingBar/action';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'leaderboards/receive',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards,
};
