// action types
const UPDATE_APP_STATE = "UPDATE_APP_STATE";

// reducer
const applicationReducer = (currentState, action) => {
  let updatedState;
  switch (action.type) {
    case UPDATE_APP_STATE:
      updatedState = { ...currentState, ...action.payload };
      break;
    default:
      updatedState = currentState;
  }
  return updatedState;
};

// action definition
export const updateAppState = (stateUpdates) => {
  return { type: UPDATE_APP_STATE, payload: stateUpdates };
};

export default applicationReducer;