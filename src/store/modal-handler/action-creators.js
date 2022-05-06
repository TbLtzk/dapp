import * as actionTypes from './action-types';

/* modal staff */
export const setCreateObj = (result) => ({
  type: actionTypes.SET_CREATED_OBJECT,
  result
});

export const setCreatedStepsLimit = (result) => ({
  type: actionTypes.SET_CREATED_STEPS_LIMIT,
  result
});

export const setStepCounter = (result) => ({
  type: actionTypes.SET_STEP_COUNTER,
  result
});

export const setDisabledCreatedObjBtn = (result) => ({
  type: actionTypes.SET_DISABLED_CREATED_OBJ_BTN,
  result
});
