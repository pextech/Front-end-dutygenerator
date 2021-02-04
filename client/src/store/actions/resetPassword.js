import {
  RESET_PASSWORD, CHANGE_PASSWORD, RESET_FAIL, RESET_SUCESS,

} from '../../constants/actions';

export const reset = (email, token, message) => ({
  type: RESET_PASSWORD,
  email,
  token,
  message,
});

export const resetFail = (error) => ({
  type: RESET_FAIL, error,
});

export const resetSucess = (error) => ({
  type: RESET_SUCESS, error,
});

export const change = (password) => ({
  type: CHANGE_PASSWORD,
  password,
});
