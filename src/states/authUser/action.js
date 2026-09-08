import api from '../../api/dicodingForum';
import {
  showLoadingActionCreator,
  hideLoadingActionCreator,
} from '../loadingBar/action';

const ActionType = {
  SET_AUTH_USER: 'authUser/set',
  UNSET_AUTH_USER: 'authUser/unset',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      await api.register({ name, email, password });
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
};
