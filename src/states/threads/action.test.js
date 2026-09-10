import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  asyncPopulateUsersAndThreads,
  asyncAddThread,
  asyncToggleVoteThread,
  ActionType,
} from './action';
import { ActionType as UsersActionType } from '../users/action';
import { ActionType as LoadingActionType } from '../loadingBar/action';
import api from '../../api/dicodingForum';

vi.mock('../../api/dicodingForum');

const fakeThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Isi thread pertama',
  category: 'general',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeUser = {
  id: 'user-1',
  name: 'User Satu',
  email: 'user@satu.com',
  avatar: 'https://example.com/avatar.jpg',
};

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('should dispatch correct actions when data fetching succeeds', async () => {
    api.getAllUsers.mockResolvedValue([fakeUser]);
    api.getAllThreads.mockResolvedValue([fakeThread]);
    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: LoadingActionType.SHOW_LOADING });
    expect(dispatch).toHaveBeenCalledWith({
      type: UsersActionType.RECEIVE_USERS,
      payload: { users: [fakeUser] },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: [fakeThread] },
    });
    expect(dispatch).toHaveBeenCalledWith({ type: LoadingActionType.HIDE_LOADING });
  });

  it('should dispatch loading actions and call alert when data fetching fails', async () => {
    const errorMessage = 'Gagal memuat data';
    api.getAllUsers.mockRejectedValue(new Error(errorMessage));
    api.getAllThreads.mockRejectedValue(new Error(errorMessage));
    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: LoadingActionType.SHOW_LOADING });
    expect(window.alert).toHaveBeenCalledWith(errorMessage);
    expect(dispatch).toHaveBeenCalledWith({ type: LoadingActionType.HIDE_LOADING });
  });
});

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('should dispatch ADD_THREAD action and return true when thread creation succeeds', async () => {
    api.createThread.mockResolvedValue(fakeThread);
    const dispatch = vi.fn();

    const result = await asyncAddThread({
      title: 'Thread Pertama',
      body: 'Isi thread pertama',
      category: 'general',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.ADD_THREAD,
      payload: { thread: fakeThread },
    });
    expect(result).toBe(true);
  });

  it('should call alert and return false when thread creation fails', async () => {
    const errorMessage = 'Gagal membuat thread';
    api.createThread.mockRejectedValue(new Error(errorMessage));
    const dispatch = vi.fn();

    const result = await asyncAddThread({
      title: 'Thread Pertama',
      body: 'Isi thread pertama',
    })(dispatch);

    expect(window.alert).toHaveBeenCalledWith(errorMessage);
    expect(result).toBe(false);
  });
});

describe('asyncToggleVoteThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('should dispatch optimistic upvote and revert when API call fails', async () => {
    api.upVoteThread.mockRejectedValue(new Error('Gagal upvote'));
    const dispatch = vi.fn();
    const getState = vi.fn().mockReturnValue({
      authUser: { id: 'user-1' },
      threads: [{ ...fakeThread, upVotesBy: [], downVotesBy: [] }],
    });

    await asyncToggleVoteThread({ threadId: 'thread-1', voteType: 1 })(dispatch, getState);

    const dispatchCalls = dispatch.mock.calls.map((call) => call[0]);
    const voteActions = dispatchCalls.filter((action) => action.type === ActionType.TOGGLE_VOTE_THREAD);

    expect(voteActions).toHaveLength(2);
    expect(voteActions[0].payload.voteType).toBe(1);
    expect(voteActions[1].payload.voteType).toBe(0);
  });

  it('should call alert when user is not authenticated', async () => {
    const dispatch = vi.fn();
    const getState = vi.fn().mockReturnValue({
      authUser: null,
      threads: [fakeThread],
    });

    await asyncToggleVoteThread({ threadId: 'thread-1', voteType: 1 })(dispatch, getState);

    expect(window.alert).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: ActionType.TOGGLE_VOTE_THREAD })
    );
  });
});
