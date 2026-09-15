import { fn } from 'storybook/test';
import VoteButton from './VoteButton';

const authUserId = 'user-1';

const meta = {
  title: 'Threads/VoteButton',
  component: VoteButton,
  tags: ['autodocs'],
  args: {
    authUserId,
    upVotesBy: [],
    downVotesBy: [],
    onUpVote: fn(),
    onDownVote: fn(),
    onNeutralize: fn(),
  },
};

export default meta;

export const Default = {};

export const Upvoted = {
  args: {
    upVotesBy: [authUserId, 'user-2'],
  },
};

export const Downvoted = {
  args: {
    downVotesBy: [authUserId],
  },
};

export const HighVoteCount = {
  args: {
    upVotesBy: Array.from({ length: 128 }, (_, index) => `upvoter-${index}`),
    downVotesBy: Array.from(
      { length: 24 },
      (_, index) => `downvoter-${index}`
    ),
  },
};
