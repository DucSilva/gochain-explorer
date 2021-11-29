export const GET_ADDRESS_REQUEST = "GET_ADDRESS_REQUEST";
export const GET_ADDRESS_SUCCESS = "GET_ADDRESS_SUCCESS";
export const GET_ADDRESS_FAILED = "GET_ADDRESS_FAILED";
export const GET_ADDRESS_TRANSACTIONS_REQUEST =
  "GET_ADDRESS_TRANSACTIONS_REQUEST";
export const GET_ADDRESS_TRANSACTIONS_SUCCESS =
  "GET_ADDRESS_TRANSACTIONS_SUCCESS";
export const GET_ADDRESS_TRANSACTIONS_FAILED =
  "GET_ADDRESS_TRANSACTIONS_FAILED";
export const GET_ADDRESS_INTERNAL_REQUEST = "GET_ADDRESS_INTERNAL_REQUEST";
export const GET_ADDRESS_INTERNAL_SUCCESS = "GET_ADDRESS_INTERNAL_SUCCESS";
export const GET_ADDRESS_INTERNAL_FAILED = "GET_ADDRESS_INTERNAL_FAILED";
export const GET_TOKEN_HOLDERS_REQUEST = "GET_TOKEN_HOLDERS_REQUEST";
export const GET_TOKEN_HOLDERS_SUCCESS = "GET_TOKEN_HOLDERS_SUCCESS";
export const GET_TOKEN_HOLDERS_FAILED = "GET_TOKEN_HOLDERS_FAILED";
export const GET_TOKEN_TXS_REQUEST = "GET_TOKEN_TXS_REQUEST";
export const GET_TOKEN_TXS_SUCCESS = "GET_TOKEN_TXS_SUCCESS";
export const GET_TOKEN_TXS_FAILED = "GET_TOKEN_TXS_FAILED";
export const GET_OWNED_TOKENS_REQUEST = "GET_OWNED_TOKENS_REQUEST";
export const GET_OWNED_TOKENS_SUCCESS = "GET_OWNED_TOKENS_SUCCESS";
export const GET_OWNED_TOKENS_FAILED = "GET_TOKEN_TXS_FAILED";

export const getAddress = (payload: any) => ({
  type: GET_ADDRESS_REQUEST,
  payload,
});

export const getAddressSuccess = (data: any) => {
  return {
    type: GET_ADDRESS_SUCCESS,
    data,
  };
};

export const getAddressFailed = (error: any) => ({
  type: GET_ADDRESS_FAILED,
  error,
});

export const getAddressTransactions = (payload: any) => ({
  type: GET_ADDRESS_TRANSACTIONS_REQUEST,
  payload,
});

export const getAddressTransactionsSuccess = (data: any) => {
  return {
    type: GET_ADDRESS_TRANSACTIONS_SUCCESS,
    data,
  };
};

export const getAddressTransactionsFailed = (error: any) => ({
  type: GET_ADDRESS_TRANSACTIONS_FAILED,
  error,
});

export const getAddressInternal = (payload: any) => ({
  type: GET_ADDRESS_INTERNAL_REQUEST,
  payload,
});

export const getAddressInternalSuccess = (data: any) => {
  return {
    type: GET_ADDRESS_INTERNAL_SUCCESS,
    data,
  };
};

export const getAddressInternalFailed = (error: any) => ({
  type: GET_ADDRESS_INTERNAL_FAILED,
  error,
});

export const getAddressHolder = (payload: any) => ({
  type: GET_TOKEN_HOLDERS_REQUEST,
  payload,
});

export const getAddressHolderSuccess = (data: any) => {
  return {
    type: GET_TOKEN_HOLDERS_SUCCESS,
    data,
  };
};

export const getAddressHolderFailed = (error: any) => ({
  type: GET_TOKEN_HOLDERS_FAILED,
  error,
});

export const getAddressTokenTXS = (payload: any) => ({
  type: GET_TOKEN_TXS_REQUEST,
  payload,
});

export const getAddressTokenTXSSuccess = (data: any) => {
  return {
    type: GET_TOKEN_TXS_SUCCESS,
    data,
  };
};

export const getAddressTokenTXSFailed = (error: any) => ({
  type: GET_TOKEN_TXS_FAILED,
  error,
});

export const getOwnedTokens = (payload: any) => ({
  type: GET_OWNED_TOKENS_REQUEST,
  payload,
});

export const getOwnedTokensSuccess = (data: any) => {
  return {
    type: GET_OWNED_TOKENS_SUCCESS,
    data,
  };
};

export const getOwnedTokensFailed = (error: any) => ({
  type: GET_OWNED_TOKENS_FAILED,
  error,
});
