export const OPEN_WALLET_REQUEST = "OPEN_WALLET_REQUEST";
export const OPEN_WALLET_SUCCESS = "OPEN_WALLET_SUCCESS";
export const OPEN_WALLET_FAILED = "OPEN_WALLET_FAILED";
export const SET_ACCOUNT_BALANCE = "SET_ACCOUNT_BALANCE";
export const CLOSE_ACCOUNT = "CLOSE_ACCOUNT";
export const RESET_PROCESSING = "RESET_PROCESSING";

export const GET_WALLET_ADDR_REQUEST = "GET_WALLET_ADDR_REQUEST";
export const GET_WALLET_ADDR_SUCCESS = "GET_WALLET_ADDR_SUCCESS";
export const GET_WALLET_ADDR_FAILED = "GET_WALLET_ADDR_FAILED";

export const CREATE_ACCOUNT_REQUEST = "CREATE_ACCOUNT_REQUEST";
export const CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS";
export const CREATE_ACCOUNT_FAILED = "CREATE_ACCOUNT_FAILED";

export const SEND_GO_REQUEST = "SEND_GO_REQUEST";
export const SEND_GO_SUCCESS = "SEND_GO_SUCCESS";
export const SEND_GO_FAILED = "SEND_GO_FAILED";

export const openWallet = (payload: any) => ({
  type: OPEN_WALLET_REQUEST,
  payload,
});

export const openWalletSuccess = (data: any) => {
  return {
    type: OPEN_WALLET_SUCCESS,
    data,
  };
};

export const openWalletFailed = (error: any) => ({
  type: OPEN_WALLET_FAILED,
  error,
});

export const setAccountBalance = (payload: any) => ({
  type: SET_ACCOUNT_BALANCE,
  payload,
});

export const closeAccount = (payload: any) => ({
  type: CLOSE_ACCOUNT,
  payload,
});

export const resetProcessingWallet = (payload: any) => ({
  type: RESET_PROCESSING,
  payload,
});

export const getWalletAddr = (payload: any) => ({
  type: GET_WALLET_ADDR_REQUEST,
  payload,
});

export const getWalletAddrSuccess = (data: any) => {
  return {
    type: GET_WALLET_ADDR_SUCCESS,
    data,
  };
};

export const getWalletAddrFailed = (error: any) => ({
  type: GET_WALLET_ADDR_FAILED,
  error,
});

export const createAccount = (payload: any) => ({
  type: CREATE_ACCOUNT_REQUEST,
  payload,
});

export const createAccountSuccess = (data: any) => {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    data,
  };
};

export const createAccountFailed = (error: any) => ({
  type: CREATE_ACCOUNT_FAILED,
  error,
});

export const sendGO = (payload: any) => ({
  type: SEND_GO_REQUEST,
  payload,
});

export const sendGOSuccess = (data: any) => {
  return {
    type: SEND_GO_SUCCESS,
    data,
  };
};

export const sendGOFailed = (error: any) => ({
  type: SEND_GO_FAILED,
  error,
});
