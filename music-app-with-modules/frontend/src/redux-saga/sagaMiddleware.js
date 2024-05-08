import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; // Your root reducer
import rootSaga from './sagas'; // Your root Saga

// Create Redux Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with Saga middleware
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Run the root Saga
sagaMiddleware.run(rootSaga);
