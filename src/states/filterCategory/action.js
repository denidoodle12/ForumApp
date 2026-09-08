const ActionType = {
  SET_FILTER_CATEGORY: 'filterCategory/set',
};

function setFilterCategoryActionCreator(category) {
  return {
    type: ActionType.SET_FILTER_CATEGORY,
    payload: {
      category,
    },
  };
}

export {
  ActionType,
  setFilterCategoryActionCreator,
};
