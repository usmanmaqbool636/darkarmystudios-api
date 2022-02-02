// import { applyMiddleware, createStore } from 'redux'
// import logger from 'redux-logger'
// import createSagaMiddleware from 'redux-saga'

// import rootReducer from './rootReducer'
// import rootSaga from './rootSaga'

// const sagaMiddleware = createSagaMiddleware()

// const middlewares = [sagaMiddleware, logger]

// const store = createStore(rootReducer, applyMiddleware(...middlewares))

// sagaMiddleware.run(rootSaga)
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
  
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  )

// then run the saga
sagaMiddleware.run(rootSaga)
export {store}