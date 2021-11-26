// /* eslint-disable no-undef */
// /**
//  * Create the store with dynamic reducers
//  */

// import { applyMiddleware, compose, createStore } from "redux";

// import createReducer from "@Redux/reducers/index";
// import createSagaMiddleware from "redux-saga";
// import rootSagas from "@Redux/sagas/index";
// import { routerMiddleware } from "connected-react-router";

// const sagaMiddleware = createSagaMiddleware();

// export default function configureStore(initialState = {}) {
//   // Create the store with two middlewares
//   // 1. sagaMiddleware: Makes redux-sagas work
//   // 2. routerMiddleware: Syncs the location/URL path to the state
//   const middlewares = [sagaMiddleware, routerMiddleware()];

//   const enhancers = [applyMiddleware(...middlewares)];

//   // If Redux DevTools Extension is installed use it, otherwise use Redux compose
//   /* eslint-disable no-underscore-dangle, indent */
//   const composeEnhancers =
//     process.env.NODE_ENV !== "production" &&
//     typeof window === "object" &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//       ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//       : compose;
//   /* eslint-enable */

//   const store = createStore(
//     createReducer({}),
//     initialState,
//     composeEnhancers(...enhancers)
//   );

//   // start sagas
//   sagaMiddleware.run(rootSagas);

//   // Extensions
//   store.runSaga = sagaMiddleware.run;
//   store.injectedReducers = {}; // Reducer registry
//   store.injectedSagas = {}; // Saga registry

//   return store;
// }

import { applyMiddleware, compose, createStore } from "redux";

import createSagaMiddleware from "redux-saga";
import rootReducer from "@Redux/reducers/index";
import rootSaga from "@Redux/sagas/index";

const saga = createSagaMiddleware();

const initializeStore = (initialState: any) => {
  const middlewares = [saga];
  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const store = createStore(
    rootReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );

  saga.run(rootSaga);

  return store;
};

export default initializeStore;
