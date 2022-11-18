import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";

// Middlewares run before the action hits the reducer.
// So when we dispatch an action before the action hits the reducer it hits the middlewares first
// const middleWares = [logger];
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const middleWares = [loggerMiddleware];

// In order to make middleware works we have to use applyMiddleware and spread all the middleware as augument
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
