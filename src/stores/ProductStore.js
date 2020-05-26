const initialState = {
  list: [],
}
const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LIST_LOADED":
        return {
          ...state,
          list: [...action.payload]
        };
      case "ITEM_LOADED":
        return {
          ...state,
          list: [...state.list, ...action.payload]
        };
      default:
        return state;
    }
  };

export default productReducer;