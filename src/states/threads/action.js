import api from '../../api/dicodingForum'
import { receiveUsersActionCreator } from '../users/action'
import {
  showLoadingActionCreator,
  hideLoadingActionCreator,
} from '../loadingBar/action'

const ActionType = {
  RECEIVE_THREADS: 'threads/receive',
  ADD_THREAD: 'threads/add',
}

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  }
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  }
}

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator())
    try {
      const [users, threads] = await Promise.all([
        api.getAllUsers(),
        api.getAllThreads(),
      ])
      dispatch(receiveUsersActionCreator(users))
      dispatch(receiveThreadsActionCreator(threads))
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(hideLoadingActionCreator())
    }
  }
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator())
    try {
      const thread = await api.createThread({ title, body, category })
      dispatch(addThreadActionCreator(thread))
      return true
    } catch (error) {
      alert(error.message)
      return false
    } finally {
      dispatch(hideLoadingActionCreator())
    }
  }
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncPopulateUsersAndThreads,
  asyncAddThread,
}
