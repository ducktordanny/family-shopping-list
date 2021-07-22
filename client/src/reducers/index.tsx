import { combineReducers } from 'redux';

import tokenReducer from './token';

const allReducers = combineReducers({ tokenReducer });

export default allReducers;
