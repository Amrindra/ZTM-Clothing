// Middlewares run before the action hits the reducer.
// So when we dispatch an action before the action hits the reducer it hits the middlewares first
// const middleWares = [logger];


import { Middleware } from 'redux';

import { RootState } from '../store';

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!action.type) {
      return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
  };
