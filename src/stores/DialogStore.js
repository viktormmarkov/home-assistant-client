const initialState = {
  open: false,
  type: '',
  params: {}
}
const dialogReducer = function (state = initialState, action) {
    switch (action.type) {
      case "DIALOG_OPEN":
        return {
          ...state,
          open: true,
          ...action.payload
        };
      case "DIALOG_CLOSE":
        return {
          open: false,
          type: null,
          params: {}
        };
      default:
        return state;
    }
  };

export default dialogReducer;