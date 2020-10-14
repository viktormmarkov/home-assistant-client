import { combineReducers, createStore} from 'redux';
import dialogReducer from './DialogStore';
import productReducer from './ProductStore';
import categoryReducer from './CategoryStore';
import localeReducer from './LocaleStore';

const rootReducer = combineReducers({
  dialog: dialogReducer,
  product: productReducer,
  category: categoryReducer,
  locale: localeReducer,
});

export const rootStore = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());