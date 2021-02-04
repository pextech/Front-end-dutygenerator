import { DELETE_RESULT, STORE_RESULT } from '../../constants/actions';

export const saveResult = (res) => ({
  type: STORE_RESULT,
  result: res,
});

export const storeResult = (res) => (dispatch) => {
  setTimeout(() => {
    dispatch(saveResult(res));
  });
};

export const deleteResult = (resultElementId) => ({
  type: DELETE_RESULT,
  resultElementId,
});
