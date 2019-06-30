import { combineReducers } from "redux";

import app from './toDoList';
import users from './user';

const appReducer = combineReducers({
  app,
  users
});

export default appReducer;
