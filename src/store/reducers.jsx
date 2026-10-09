import {
  APPLY_NUMBER,
  CHANGE_OPERATION,
  CLEAR_DISPLAY,
  RESULT,
  MEMORY_ADD,
  MEMORY_RECALL,
  MEMORY_CLEAR,
} from "./actions.jsx";

export const initialState = {
  total: 0,
  operation: "+",
  memory: 0,
  temp: 0,
};

const calculateResult = (num1, num2, operation) => {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "*":
      return num1 * num2;
    case "-":
      return num1 - num2;
    case "/":
      return num1 / num2;
    default:
      return num2;
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case APPLY_NUMBER: {
      const newTotal = Number(`${state.total === 0 ? "" : state.total}${action.payload}`);
      return {
        ...state,
        total: newTotal,
      };
    }

    case CHANGE_OPERATION:
      return {
        ...state,
        operation: action.payload,
        temp: state.total,
        total: 0,
      };

    case CLEAR_DISPLAY:
      return {
        ...state,
        total: 0,
      };

    case RESULT:
      return {
        ...state,
        total: calculateResult(state.temp, state.total, state.operation),
      };

    case MEMORY_ADD:
      return {
        ...state,
        memory: state.total,
      };

    case MEMORY_RECALL:
      return {
        ...state,
        total: state.memory,
      };

    case MEMORY_CLEAR:
      return {
        ...state,
        memory: 0,
      };

    default:
      return state;
  }
};