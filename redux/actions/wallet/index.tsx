export const OPEN_WALLET_REQUEST = "OPEN_WALLET_REQUEST";
export const OPEN_WALLET_SUCCESS = "OPEN_WALLET_SUCCESS";
export const OPEN_WALLET_FAILED = "OPEN_WALLET_FAILED";
export const SET_ACCOUNT_BALANCE = "SET_ACCOUNT_BALANCE";

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