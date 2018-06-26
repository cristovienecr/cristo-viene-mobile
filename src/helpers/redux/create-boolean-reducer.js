import { T, F } from 'ramda';
import { handleActions } from 'redux-actions';

const createBooleanReducer = (active, deactive, initial = false) =>
  handleActions(
    {
      [active]: T,
      [deactive]: F,
    },
    initial,
  );

export default createBooleanReducer;
