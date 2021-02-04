import {
  RESET_FAIL,
  RESET_PASSWORD, RESET_SUCESS,

} from '../../constants/actions';

import { resetInitialState } from '../initialState';
import updateObject from '../utility';

const resetStart = (state, action) => updateObject(state,
  {
    email: action.email,
    error: action.error,
    loading: action.loading,
    token: action.token,
    message: action.message,
  });

const resetSuccess = (state, action) => updateObject(state, {
  token: action.token,
  email: action.email,
  error: null,
  loading: false,
  message: action.message,
});

const resetFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false,
});

const reducer = (state = resetInitialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD:
      return resetStart(state, action);
    case RESET_SUCESS:
      return resetSuccess(state, action);
    case RESET_FAIL:
      return resetFail(state, action);
    default:
      return state;
  }
};

export default reducer;
