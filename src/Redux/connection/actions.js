import { ActionTypes } from "../types";

export const connectionAction = (wallet) => {
  return {
    type: ActionTypes.CONNECT,
    payload: wallet,
  };
};

export const disconnectAction = () => {
  return {
    type: ActionTypes.DISCONNECT,
  };
};

export const web3Actions = (web3) => {
  return {
    type: ActionTypes.WEB3_INSTANCE,
    payload: web3,
  };
};
