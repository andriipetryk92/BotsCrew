import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../../redux/index';


const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

let middleware = [thunk];

if (isDev) { middleware.push(logger) }

let store = createStore(
  rootReducer,
 
  {
    users: { user: JSON.parse(localStorage.getItem('user')) ? [JSON.parse(localStorage.getItem('user'))] : [] }
    
  },
  
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
  
);
store.subscribe(() => {

  localStorage.setItem('user', JSON.stringify(store.getState().users.user[0]));

})
export default {
  store
};
