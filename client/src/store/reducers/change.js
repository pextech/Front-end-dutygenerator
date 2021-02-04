import {
  CHANGE_PASSWORD,

} from '../../constants/actions';

import { changeInitialState } from '../initialState';
import updateObject from '../utility';

const reducer = (state = changeInitialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return updateObject(state,
        { password: action.password });
    default:
      return state;
  }
};

export default reducer;
