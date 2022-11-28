import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { rootSaga } from './root-saga';
import { rootReducer } from './rootReducer';


export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  // persistedReducer,
  rootReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);






// import { compose, createStore, applyMiddleware } from "redux";
// import { rootReducer } from "./rootReducer";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import logger from "redux-logger";
// import createSagaMiddleware from "redux-saga";
// import { rootSaga } from "./root-saga";

// const sagaMiddleware = createSagaMiddleware();

// // It will return an empty array if it's false, otherwise it return logger
// // in the development mode it won't trigger the logger
// const middleWares = [
//   process.env.NODE_ENV === "development" && logger,
//   sagaMiddleware,
// ].filter(Boolean);

// const composeEnhancer =
//   (process.env.NODE_ENV !== "production" &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// // We use persistConfig to tell redux persist what we want
// const persistConfig = {
//   key: "root", //key is what we start with and 'root' means that we want persist the whole thing. "root level"
//   storage, //it's just the local storage in the browser
//   blacklist: ["user"], // Telling redux not to persist the user.
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // In order to make middleware works we have to use applyMiddleware and spread all the middleware as augument
// const composedEnhancers = compose(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);

// sagaMiddleware.run(rootSaga);
// export const persistor = persistStore(store);
