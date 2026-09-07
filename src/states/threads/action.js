import api from '../../api/dicodingForum'
import { receiveUsersActionCreator } from '../users/action'
import {
  showLoadingActionCreator,
  hideLoadingActionCreator,
} from '../loadingBar/action'

const ActionType = {
  RECEIVE_THREADS: 'threads/receive',
  ADD_THREAD: 'threads/add',
  TOGGLE_VOTE_THREAD: 'threads/toggleVote',
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

function toggleVoteThreadActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      voteType,
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

function asyncToggleVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState()
    if (!authUser) {
      alert('Silakan masuk terlebih dahulu untuk melakukan vote.')
      return
    }

    const thread = threads.find((t) => t.id === threadId)
    if (!thread) return

    const wasUpvoted = thread.upVotesBy.includes(authUser.id)
    const wasDownvoted = thread.downVotesBy.includes(authUser.id)
    const previousVoteType = wasUpvoted ? 1 : wasDownvoted ? -1 : 0

    dispatch(
      toggleVoteThreadActionCreator({
        threadId,
        userId: authUser.id,
        voteType,
      })
    )

    try {
      if (voteType === 1) {
        await api.upVoteThread(threadId)
      } else if (voteType === -1) {
        await api.downVoteThread(threadId)
      } else {
        await api.neutralizeVoteThread(threadId)
      }
    } catch (error) {
      dispatch(
        toggleVoteThreadActionCreator({
          threadId,
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
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator,
  asyncPopulateUsersAndThreads,
  asyncAddThread,
  asyncToggleVoteThread,
}
