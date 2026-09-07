import api from '../../api/dicodingForum'
import {
  showLoadingActionCreator,
  hideLoadingActionCreator,
} from '../loadingBar/action'

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'detailThread/receive',
  CLEAR_DETAIL_THREAD: 'detailThread/clear',
  ADD_COMMENT: 'detailThread/addComment',
}

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  }
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  }
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  }
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(clearDetailThreadActionCreator())
    dispatch(showLoadingActionCreator())
    try {
      const detailThread = await api.getDetailThread(threadId)
      dispatch(receiveDetailThreadActionCreator(detailThread))
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(hideLoadingActionCreator())
    }
  }
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator())
    try {
      const comment = await api.createComment({ threadId, content })
      dispatch(addCommentActionCreator(comment))
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
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  addCommentActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment,
}
