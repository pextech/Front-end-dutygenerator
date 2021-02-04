import {
  INCREMENT, DECREMENT, ADD, SUBTRACT,
} from '../../constants/actions';
import { counterInitialState } from '../initialState';
import updateObject from '../utility';

const reducer = (state = counterInitialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return updateObject(state, { counter: state.counter + 1 });
    case DECREMENT:
      return updateObject(state, { counter: state.counter - 1 });
    case ADD:
      return updateObject(state, { counter: state.counter + action.val });
    case SUBTRACT:
      return updateObject(state, { counter: state.counter - action.val });
    default:
      return state;
  }
};

export default reducer;
