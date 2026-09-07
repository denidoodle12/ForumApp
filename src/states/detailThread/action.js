import api from '../../api/dicodingForum'
import {
  showLoadingActionCreator,
  hideLoadingActionCreator,
} from '../loadingBar/action'

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'detailThread/receive',
  CLEAR_DETAIL_THREAD: 'detailThread/clear',
  ADD_COMMENT: 'detailThread/addComment',
  TOGGLE_VOTE_DETAIL_THREAD: 'detailThread/toggleVote',
  TOGGLE_VOTE_COMMENT: 'detailThread/toggleVoteComment',
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

function toggleVoteDetailThreadActionCreator({ userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_DETAIL_THREAD,
    payload: {
      userId,
      voteType,
    },
  }
}

function toggleVoteCommentActionCreator({ commentId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
      voteType,
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

function asyncToggleVoteDetailThread(voteType) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    if (!authUser) {
      alert('Silakan masuk terlebih dahulu untuk melakukan vote.')
      return
    }
    if (!detailThread) return

    const wasUpvoted = detailThread.upVotesBy.includes(authUser.id)
    const wasDownvoted = detailThread.downVotesBy.includes(authUser.id)
    const previousVoteType = wasUpvoted ? 1 : wasDownvoted ? -1 : 0

    dispatch(
      toggleVoteDetailThreadActionCreator({
        userId: authUser.id,
        voteType,
      })
    )

    try {
      if (voteType === 1) {
        await api.upVoteThread(detailThread.id)
      } else if (voteType === -1) {
        await api.downVoteThread(detailThread.id)
      } else {
        await api.neutralizeVoteThread(detailThread.id)
      }
    } catch (error) {
      dispatch(
        toggleVoteDetailThreadActionCreator({
          userId: authUser.id,
          voteType: previousVoteType,
        })
      )
      alert(error.message)
    }
  }
}

function asyncToggleVoteComment({ commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    if (!authUser) {
      alert('Silakan masuk terlebih dahulu untuk melakukan vote.')
      return
    }
    if (!detailThread) return

    const comment = detailThread.comments.find((c) => c.id === commentId)
    if (!comment) return

    const wasUpvoted = comment.upVotesBy.includes(authUser.id)
    const wasDownvoted = comment.downVotesBy.includes(authUser.id)
    const previousVoteType = wasUpvoted ? 1 : wasDownvoted ? -1 : 0

    dispatch(
      toggleVoteCommentActionCreator({
        commentId,
        userId: authUser.id,
        voteType,
      })
    )

    try {
      if (voteType === 1) {
        await api.upVoteComment({ threadId: detailThread.id, commentId })
      } else if (voteType === -1) {
        await api.downVoteComment({ threadId: detailThread.id, commentId })
      } else {
        await api.neutralizeVoteComment({
          threadId: detailThread.id,
          commentId,
        })
      }
    } catch (error) {
      dispatch(
        toggleVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
          voteType: previousVoteType,
        })
      )
      alert(error.message)
    }
  }
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  addCommentActionCreator,
  toggleVoteDetailThreadActionCreator,
  toggleVoteCommentActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  asyncToggleVoteComment,
}
