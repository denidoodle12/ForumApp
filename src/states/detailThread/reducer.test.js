import { describe, it, expect } from 'vitest';
import detailThreadReducer from './reducer';
import { ActionType } from './action';

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

describe('detailThreadReducer', () => {
  it('should return null as initial state when given an unknown action', () => {
    const action = { type: 'UNKNOWN' };

    const nextState = detailThreadReducer(undefined, action);

    expect(nextState).toBeNull();
  });

  it('should return the detail thread when given RECEIVE_DETAIL_THREAD action', () => {
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_DETAIL_THREAD,
      payload: { detailThread: fakeDetailThread },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toEqual(fakeDetailThread);
  });

  it('should return null when given CLEAR_DETAIL_THREAD action', () => {
    const initialState = fakeDetailThread;
    const action = { type: ActionType.CLEAR_DETAIL_THREAD };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should prepend the new comment when given ADD_COMMENT action', () => {
    const secondComment = { ...fakeComment, id: 'comment-2', content: 'Komentar kedua' };
    const initialState = { ...fakeDetailThread, comments: [secondComment] };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: fakeComment },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState.comments).toHaveLength(2);
    expect(nextState.comments[0].id).toBe('comment-1');
  });

  it('should add userId to upVotesBy and remove from downVotesBy when given TOGGLE_VOTE_DETAIL_THREAD with voteType 1', () => {
    const initialState = { ...fakeDetailThread, upVotesBy: [], downVotesBy: ['user-1'] };
    const action = {
      type: ActionType.TOGGLE_VOTE_DETAIL_THREAD,
      payload: { userId: 'user-1', voteType: 1 },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState.upVotesBy).toContain('user-1');
    expect(nextState.downVotesBy).not.toContain('user-1');
  });

  it('should remove userId from both vote arrays when given TOGGLE_VOTE_DETAIL_THREAD with voteType 0', () => {
    const initialState = { ...fakeDetailThread, upVotesBy: ['user-1'], downVotesBy: [] };
    const action = {
      type: ActionType.TOGGLE_VOTE_DETAIL_THREAD,
      payload: { userId: 'user-1', voteType: 0 },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState.upVotesBy).not.toContain('user-1');
    expect(nextState.downVotesBy).not.toContain('user-1');
  });

  it('should add userId to comment upVotesBy when given TOGGLE_VOTE_COMMENT with voteType 1', () => {
    const initialState = {
      ...fakeDetailThread,
      comments: [{ ...fakeComment, upVotesBy: [], downVotesBy: [] }],
    };
    const action = {
      type: ActionType.TOGGLE_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-2', voteType: 1 },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).toContain('user-2');
    expect(nextState.comments[0].downVotesBy).not.toContain('user-2');
  });

  it('should add userId to comment downVotesBy when given TOGGLE_VOTE_COMMENT with voteType -1', () => {
    const initialState = {
      ...fakeDetailThread,
      comments: [{ ...fakeComment, upVotesBy: ['user-2'], downVotesBy: [] }],
    };
    const action = {
      type: ActionType.TOGGLE_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-2', voteType: -1 },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState.comments[0].downVotesBy).toContain('user-2');
    expect(nextState.comments[0].upVotesBy).not.toContain('user-2');
  });
});
