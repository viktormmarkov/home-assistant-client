import _ from 'lodash';

const initialState = {
  list: [],
}
const entityType = 'product';
const removeItemFromList = (list, item) => {
  return _.reject(list, i => i._id === item._id);
}
const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LIST_LOADED":
        if (action.entityType !== entityType) {
          return {...state};
        }
        return {
          ...state,
          list: [...action.payload]
        };
      case "ITEM_SAVED":
        if (action.entityType !== entityType) {
          return {...state};
        }
        return {
          ...state,
          list: [...removeItemFromList(state.list, action.payload), action.payload]
        };
      case "ITEM_DELETED":
        if (action.entityType !== entityType) {
          return {...state};
        }
        return {
          ...state,
          list: [...removeItemFromList(state.list, action.payload)]
        };
      default:
        return state;
    }
  };

export default productReducer;