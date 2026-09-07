const ActionType = {
  SHOW_LOADING: 'loadingBar/show',
  HIDE_LOADING: 'loadingBar/hide',
}

function showLoadingActionCreator() {
  return {
    type: ActionType.SHOW_LOADING,
  }
}

function hideLoadingActionCreator() {
  return {
    type: ActionType.HIDE_LOADING,
  }
}

export {
  ActionType,
  showLoadingActionCreator,
  hideLoadingActionCreator,
}
