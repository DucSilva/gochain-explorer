export const GET_ADDRESS_REQUEST = "GET_ADDRESS_REQUEST";
export const GET_ADDRESS_SUCCESS = "GET_ADDRESS_SUCCESS";
export const GET_ADDRESS_FAILED = "GET_ADDRESS_FAILED";
export const GET_ADDRESS_TRANSACTIONS_REQUEST =
  "GET_ADDRESS_TRANSACTIONS_REQUEST";
export const GET_ADDRESS_TRANSACTIONS_SUCCESS =
  "GET_ADDRESS_TRANSACTIONS_SUCCESS";
export const GET_ADDRESS_TRANSACTIONS_FAILED =
  "GET_ADDRESS_TRANSACTIONS_FAILED";

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
