import { combineReducers, createStore} from 'redux';
import dialogReducer from './DialogStore';
import productReducer from './ProductStore';

const rootReducer = combineReducers({
  dialog: dialogReducer,
  product: productReducer
});

export const rootStore = createStore(rootReducer);