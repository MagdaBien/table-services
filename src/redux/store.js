import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import initialState from './initialState';
import tablesReducer from './tablesRedux';
import statutsReducer from './statutsRedux'

const subreducers = {
  tables: tablesReducer,
  statuts: statutsReducer
}

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )

);

export default store;
