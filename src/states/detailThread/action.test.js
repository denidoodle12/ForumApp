import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  ActionType,
} from './action';
import { ActionType as LoadingActionType } from '../loadingBar/action';
import api from '../../api/dicodingForum';

vi.mock('../../api/dicodingForum');

/**
 * Test scenarios for detail thread thunks:
 * - receives a thread detail when the API request succeeds
 * - handles an error while receiving a thread detail
 * - adds a comment when the API request succeeds
 * - handles an error while adding a comment
 * - reverts an optimistic detail thread vote when the API request fails
 * - prevents an unauthenticated user from voting
 * - keeps an optimistic detail thread vote when the API request succeeds
 */
const fakeDetailThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Isi thread pertama',
  category: 'general',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: { id: 'user-1', name: 'User Satu', avatar: 'https://example.com/avatar.jpg' },
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};

const fakeComment = {
  id: 'comment-1',
  content: 'Komentar pertama',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: { id: 'user-2', name: 'User Dua', avatar: 'https://example.com/avatar2.jpg' },
  upVotesBy: [],
  downVotesBy: [],
};

describe('asyncReceiveDetailThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('should dispatch CLEAR, loading, and RECEIVE actions when fetching succeeds', async () => {
    api.getDetailThread.mockResolvedValue(fakeDetailThread);
    const dispatch = vi.fn();

    await asyncReceiveDetailThread('thread-1')(dispatch);

    const dispatchedTypes = dispatch.mock.calls.map((call) => call[0].type);
    expect(dispatchedTypes).toContain(ActionType.CLEAR_DETAIL_THREAD);
    expect(dispatchedTypes).toContain(LoadingActionType.SHOW_LOADING);
    expect(dispatchedTypes).toContain(ActionType.RECEIVE_DETAIL_THREAD);
    expect(dispatchedTypes).toContain(LoadingActionType.HIDE_LOADING);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.RECEIVE_DETAIL_THREAD,
      payload: { detailThread: fakeDetailThread },
    });
  });

  it('should dispatch CLEAR and loading actions then call alert when fetching fails', async () => {
    const errorMessage = 'Thread tidak ditemukan';
    api.getDetailThread.mockRejectedValue(new Error(errorMessage));
    const dispatch = vi.fn();

    await asyncReceiveDetailThread('thread-tidak-ada')(dispatch);

    const dispatchedTypes = dispatch.mock.calls.map((call) => call[0].type);
    expect(dispatchedTypes).toContain(ActionType.CLEAR_DETAIL_THREAD);
    expect(dispatchedTypes).toContain(LoadingActionType.SHOW_LOADING);
    expect(dispatchedTypes).toContain(LoadingActionType.HIDE_LOADING);
    expect(window.alert).toHaveBeenCalledWith(errorMessage);
  });
});

describe('asyncAddComment thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('should dispatch ADD_COMMENT action and return true when comment creation succeeds', async () => {
    api.createComment.mockResolvedValue(fakeComment);
    const dispatch = vi.fn();

    const result = await asyncAddComment({
      threadId: 'thread-1',
      content: 'Komentar pertama',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.ADD_COMMENT,
      payload: { comment: fakeComment },
    });
    expect(result).toBe(true);
  });

  it('should call alert and return false when comment creation fails', async () => {
    const errorMessage = 'Gagal membuat komentar';
    api.createComment.mockRejectedValue(new Error(errorMessage));
    const dispatch = vi.fn();

    const result = await asyncAddComment({
      threadId: 'thread-1',
      content: 'Komentar pertama',
    })(dispatch);

    expect(window.alert).toHaveBeenCalledWith(errorMessage);
    expect(result).toBe(false);
  });
});

describe('asyncToggleVoteDetailThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('should dispatch optimistic downvote and revert when API call fails', async () => {
    api.downVoteThread.mockRejectedValue(new Error('Gagal downvote'));
    const dispatch = vi.fn();
    const getState = vi.fn().mockReturnValue({
      authUser: { id: 'user-1' },
      detailThread: { ...fakeDetailThread, upVotesBy: [], downVotesBy: [] },
    });

    await asyncToggleVoteDetailThread(-1)(dispatch, getState);

    const voteActions = dispatch.mock.calls
      .map((call) => call[0])
      .filter((action) => action.type === ActionType.TOGGLE_VOTE_DETAIL_THREAD);

    expect(voteActions).toHaveLength(2);
    expect(voteActions[0].payload.voteType).toBe(-1);
    expect(voteActions[1].payload.voteType).toBe(0);
    expect(window.alert).toHaveBeenCalled();
  });

  it('should call alert when user is not authenticated', async () => {
    const dispatch = vi.fn();
    const getState = vi.fn().mockReturnValue({
      authUser: null,
      detailThread: fakeDetailThread,
    });

    await asyncToggleVoteDetailThread(1)(dispatch, getState);

    expect(window.alert).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: ActionType.TOGGLE_VOTE_DETAIL_THREAD })
    );
  });

  it('should dispatch upvote action when user is authenticated and API succeeds', async () => {
    api.upVoteThread.mockResolvedValue({});
    const dispatch = vi.fn();
    const getState = vi.fn().mockReturnValue({
      authUser: { id: 'user-1' },
      detailThread: { ...fakeDetailThread, upVotesBy: [], downVotesBy: [] },
    });

    await asyncToggleVoteDetailThread(1)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.TOGGLE_VOTE_DETAIL_THREAD,
      payload: { userId: 'user-1', voteType: 1 },
    });
    expect(window.alert).not.toHaveBeenCalled();
  });
});
