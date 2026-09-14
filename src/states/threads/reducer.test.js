import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

/**
 * Test scenarios for threadsReducer:
 * - returns the initial state for an unknown action
 * - receives a collection of threads
 * - prepends a newly created thread
 * - applies an upvote and removes an existing downvote
 * - applies a downvote and removes an existing upvote
 * - removes both votes when a vote is neutralized
 */
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

describe('threadsReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: [fakeThread] },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([fakeThread]);
  });

  it('should prepend the new thread when given ADD_THREAD action', () => {
    const secondThread = { ...fakeThread, id: 'thread-2', title: 'Thread Kedua' };
    const initialState = [secondThread];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: fakeThread },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([fakeThread, secondThread]);
    expect(nextState[0].id).toBe('thread-1');
  });

  it('should add userId to upVotesBy and remove from downVotesBy when given TOGGLE_VOTE_THREAD with voteType 1', () => {
    const initialState = [
      { ...fakeThread, upVotesBy: [], downVotesBy: ['user-1'] },
    ];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1', voteType: 1 },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');
  });

  it('should add userId to downVotesBy and remove from upVotesBy when given TOGGLE_VOTE_THREAD with voteType -1', () => {
    const initialState = [
      { ...fakeThread, upVotesBy: ['user-1'], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1', voteType: -1 },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].downVotesBy).toContain('user-1');
    expect(nextState[0].upVotesBy).not.toContain('user-1');
  });

  it('should remove userId from upVotesBy and downVotesBy when given TOGGLE_VOTE_THREAD with voteType 0', () => {
    const initialState = [
      { ...fakeThread, upVotesBy: ['user-1'], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1', voteType: 0 },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).not.toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');
  });
});
