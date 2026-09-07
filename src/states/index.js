import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUser/reducer'
import isPreloadReducer from './isPreload/reducer'
import usersReducer from './users/reducer'
import loadingBarReducer from './loadingBar/reducer'
import threadsReducer from './threads/reducer'
import detailThreadReducer from './detailThread/reducer'
import leaderboardsReducer from './leaderboards/reducer'
import filterCategoryReducer from './filterCategory/reducer'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    leaderboards: leaderboardsReducer,
    filterCategory: filterCategoryReducer,
  },
})

export default store


