import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButton from './VoteButton';

/**
 * Test scenarios for VoteButton:
 * - renders upvote and downvote totals
 * - calls the upvote handler for a new upvote
 * - calls the neutralize handler for an existing upvote
 * - calls the downvote handler for a new downvote
 */
describe('VoteButton', () => {
  it('should render the correct upvote and downvote counts', () => {
    render(
      <VoteButton
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        authUserId="user-4"
        onUpVote={vi.fn()}
        onDownVote={vi.fn()}
        onNeutralize={vi.fn()}
      />
    );

    const upvoteButton = screen.getByTitle('Suka');
    const downvoteButton = screen.getByTitle('Tidak Suka');

    expect(upvoteButton).toHaveTextContent('2');
    expect(downvoteButton).toHaveTextContent('1');
  });

  it('should call onUpVote when upvote button is clicked and user has not voted', async () => {
    const onUpVote = vi.fn();
    const onNeutralize = vi.fn();
    const user = userEvent.setup();

    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={onUpVote}
        onDownVote={vi.fn()}
        onNeutralize={onNeutralize}
      />
    );

    await user.click(screen.getByTitle('Suka'));

    expect(onUpVote).toHaveBeenCalledTimes(1);
    expect(onNeutralize).not.toHaveBeenCalled();
  });

  it('should call onNeutralize when upvote button is clicked and user has already upvoted', async () => {
    const onUpVote = vi.fn();
    const onNeutralize = vi.fn();
    const user = userEvent.setup();

    render(
      <VoteButton
        upVotesBy={['user-1']}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={onUpVote}
        onDownVote={vi.fn()}
        onNeutralize={onNeutralize}
      />
    );

    await user.click(screen.getByTitle('Suka'));

    expect(onNeutralize).toHaveBeenCalledTimes(1);
    expect(onUpVote).not.toHaveBeenCalled();
  });

  it('should call onDownVote when downvote button is clicked and user has not voted', async () => {
    const onDownVote = vi.fn();
    const user = userEvent.setup();

    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={vi.fn()}
        onDownVote={onDownVote}
        onNeutralize={vi.fn()}
      />
    );

    await user.click(screen.getByTitle('Tidak Suka'));

    expect(onDownVote).toHaveBeenCalledTimes(1);
  });
});
