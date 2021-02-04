import { STORE_RESULT, DELETE_RESULT } from '../../constants/actions';
import { resultInitialState } from '../initialState';
import updateObject from '../utility';

const reducer = (state = resultInitialState, action) => {
  switch (action.type) {
    case STORE_RESULT:
      return updateObject(
        state,
        {
          results: state.results.concat({ id: new Date(), value: action.result }),
        },
      );
    case DELETE_RESULT:
      return updateObject(
        state,
        {
          results: state.results.filter((result) => result.id !== action.resultElementId),
        },
      );
    default:

      return state;
  }
};

export default reducer;
