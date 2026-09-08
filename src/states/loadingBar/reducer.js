import { ActionType } from './action';

function loadingBarReducer(loadingBar = 0, action = {}) {
  switch (action.type) {
  case ActionType.SHOW_LOADING:
    return loadingBar + 1;
  case ActionType.HIDE_LOADING:
    return Math.max(0, loadingBar - 1);
  default:
    return loadingBar;
  }
}

export default loadingBarReducer;
