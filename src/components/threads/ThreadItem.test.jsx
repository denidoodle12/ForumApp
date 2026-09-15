import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from './ThreadItem';
import authUserReducer from '../../states/authUser/reducer';

/**
 * Test scenarios for ThreadItem:
 * - renders the title, body snippet, and author
 * - renders a category when provided
 * - hides the category when it is empty
 */
const fakeThread = {
  id: 'thread-1',
  title: 'Judul Thread Pertama',
  body: 'Isi konten thread pertama',
  category: 'react',
  createdAt: '2021-06-21T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 3,
  user: {
    id: 'user-1',
    name: 'User Satu',
    avatar: 'https://example.com/avatar.jpg',
  },
};

function buildStore() {
  return configureStore({
    reducer: {
      authUser: authUserReducer,
    },
  });
}

function renderThreadItem(props = {}) {
  return render(
    <Provider store={buildStore()}>
      <MemoryRouter>
        <ThreadItem {...fakeThread} {...props} />
      </MemoryRouter>
    </Provider>
  );
}

describe('ThreadItem', () => {
  it('should render thread title, body snippet, and user name correctly', () => {
    renderThreadItem();

    expect(screen.getByText('Judul Thread Pertama')).toBeInTheDocument();
    expect(screen.getByText('Isi konten thread pertama')).toBeInTheDocument();
    expect(screen.getByText('User Satu')).toBeInTheDocument();
  });

  it('should render category badge when category is provided', () => {
    renderThreadItem({ category: 'react' });

    expect(screen.getByText('#react')).toBeInTheDocument();
  });

  it('should not render category badge when category is empty', () => {
    renderThreadItem({ category: '' });

    expect(screen.queryByText(/^#/)).not.toBeInTheDocument();
  });
});
