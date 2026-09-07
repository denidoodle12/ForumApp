import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUser/reducer'
import isPreloadReducer from './isPreload/reducer'
import usersReducer from './users/reducer'
import loadingBarReducer from './loadingBar/reducer'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
})

export default store
