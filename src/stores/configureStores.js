import { combineReducers, createStore} from 'redux';
import dialogReducer from './DialogStore';
import productReducer from './ProductStore';
import categoryReducer from './CategoryStore';

const rootReducer = combineReducers({
  dialog: dialogReducer,
  product: productReducer,
  category: categoryReducer
});

export const rootStore = createStore(rootReducer);