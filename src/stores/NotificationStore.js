import { createStore } from 'redux';

const initialState = {
  open: false,
  type: '',
  params: {}
}
const notificationReducer = function (state = false, action) {
    switch (action.type) {
      case "DIALOG_OPEN":
        return {
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
        return initialState;
    }
  };

export const NotificationStore = createStore(notificationReducer);