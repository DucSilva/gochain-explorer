export const GET_BLOCK_TRANSACTION_REQUEST = "GET_BLOCK_TRANSACTION_REQUEST";
export const GET_BLOCK_TRANSACTION_SUCCESS = "GET_BLOCK_TRANSACTION_SUCCESS";
export const GET_BLOCK_TRANSACTION_FAILED = "GET_BLOCK_TRANSACTION_FAILED";


export const getBlockTransactions = (payload: any) => ({
  type: GET_BLOCK_TRANSACTION_REQUEST,
  payload,
});

export const getBlockTransactionsSuccess = (data: any) => {
  return {
    type: GET_BLOCK_TRANSACTION_SUCCESS,
    data,
  };
};

export const getBlockTransactionsFailed = (error: any) => ({
  type: GET_BLOCK_TRANSACTION_FAILED,
  error,
});
