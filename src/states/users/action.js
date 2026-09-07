import api from '../../api/dicodingForum'
import {
  showLoadingActionCreator,
  hideLoadingActionCreator,
} from '../loadingBar/action'

const ActionType = {
  RECEIVE_USERS: 'users/receive',
}

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  }
}

function asyncReceiveUsers() {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator())
    try {
      const users = await api.getAllUsers()
      dispatch(receiveUsersActionCreator(users))
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(hideLoadingActionCreator())
    }
  }
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncReceiveUsers,
}
