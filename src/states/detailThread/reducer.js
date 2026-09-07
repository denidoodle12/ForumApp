import { ActionType } from './action'

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread
    case ActionType.CLEAR_DETAIL_THREAD:
      return null
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      }
    default:
      return detailThread
  }
}

export default detailThreadReducer
