// Middlewares run before the action hits the reducer.
// So when we dispatch an action before the action hits the reducer it hits the middlewares first
// const middleWares = [logger];
export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};
