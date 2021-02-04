import {
  ADD, DECREMENT, INCREMENT, SUBTRACT,
} from '../../constants/actions';

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const add = (value) => ({
  type: ADD,
  val: value,
});

export const subtract = (value) => ({
  type: SUBTRACT,
  val: value,
});
