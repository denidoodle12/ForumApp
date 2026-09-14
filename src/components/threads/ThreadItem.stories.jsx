import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import authUserReducer from '../../states/authUser/reducer';
import threadsReducer from '../../states/threads/reducer';
import ThreadItem from './ThreadItem';

const authUser = {
  id: 'user-1',
  name: 'Deni Developer',
  email: 'deni@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Deni+Developer',
};

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    threads: threadsReducer,
  },
  preloadedState: {
    authUser,
    threads: [],
  },
});

const meta = {
  title: 'Threads/ThreadItem',
  component: ThreadItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
  args: {
    id: 'thread-1',
    title: 'Bagaimana cara mengelola state React dengan baik?',
    body: 'Bagikan pendekatan dan pengalaman Anda dalam mengelola state pada aplikasi React berskala besar.',
    category: 'react',
    createdAt: '2026-09-14T08:00:00.000Z',
    upVotesBy: ['user-2', 'user-3'],
    downVotesBy: [],
    totalComments: 7,
    user: {
      id: 'user-2',
      name: 'React Enthusiast',
      avatar: 'https://ui-avatars.com/api/?name=React+Enthusiast',
    },
  },
};

export default meta;

export const Default = {};

export const LongBody = {
  args: {
    id: 'thread-2',
    title: 'Pengalaman membangun aplikasi forum yang mudah dipelihara',
    body: 'Membangun aplikasi yang mudah dipelihara membutuhkan pembagian tanggung jawab yang jelas antara komponen presentasional, pengelolaan state, akses API, serta pengujian otomatis. Struktur tersebut membantu tim mengembangkan fitur baru tanpa meningkatkan risiko regresi pada fitur yang sudah berjalan.',
    totalComments: 18,
  },
};

export const NoCategory = {
  args: {
    id: 'thread-3',
    title: 'Diskusi umum komunitas React',
    category: '',
    upVotesBy: [authUser.id],
    totalComments: 3,
  },
};
