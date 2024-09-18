import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import logger from 'redux-logger';

import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios';

// this startingPlantArray should eventually be removed
const startingPlantArray = []

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'SET_PLANTS':
      return [...state, action.payload]
    default:
      return state;
  }
};

function* fetchPlants(action) {
  try {
    const plantsResponse = yield axios.get('/api/plants');
    console.log ('this is the plants response', plantsResponse);
    yield put({ type: 'SET_PLANTS', payload: plantsResponse.data});
  } catch(error) {
console.log('error fetching plants', error);
  }
}


function* postPlants(action) {
  try {
    console.log('new plant', action.payload);
    yield axios.post('/api/plants', { name: action.payload });
    yield put({
      type: 'FETCH_PLANTS' });
    }
    catch (error) {
      console.log('Error posting an Element..', error);
    }
}
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
function* rootSaga(){
  yield takeEvery('FETCH_PLANTS', fetchPlants);
  yield takeEvery('POST_PLANTS', postPlants);
}

const sagaMiddleware = createSagaMiddleware();


const store = createStore(
      combineReducers({ plantList }),
      applyMiddleware(sagaMiddleware, logger),
    );

    sagaMiddleware.run(rootSaga);
  // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  export default store;
