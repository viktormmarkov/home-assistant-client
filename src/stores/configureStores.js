import { combineReducers, createStore} from 'redux';
import dialogReducer from './DialogStore';

const rootReducer = combineReducers({
  dialog: dialogReducer
});

export const rootStore = createStore(rootReducer);