import { ActionTypes } from "../types";

const INITIAL_STATE = {
  connection: "Connect Wallet",
  web3: null,
};

const connectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.CONNECT:
      return {
        ...state,
        connection: action.payload,
      };
    case ActionTypes.WEB3_INSTANCE:
      return {
        ...state,
        web3: action.payload,
      };

    default:
      return state;
  }
};
export default connectReducer;
