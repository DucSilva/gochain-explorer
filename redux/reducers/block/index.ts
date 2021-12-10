// import action type

import {
  GET_BLOCK_TRANSACTION_FAILED,
  GET_BLOCK_TRANSACTION_REQUEST,
  GET_BLOCK_TRANSACTION_SUCCESS
} from '@Redux/actions/block';

const initialState: any = {
  isLoading: false,
  error: {},
  transactions: [],
};

const blockReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_BLOCK_TRANSACTION_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        isLoading: true,
        payload,
      };
    }

    case GET_BLOCK_TRANSACTION_SUCCESS: {
      const { transactions } = action?.data;

      return {
        ...state,
        isLoading: false,
        transactions,
      };
    }

    case GET_BLOCK_TRANSACTION_FAILED: {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    default:
      return state;
  }
};

export default blockReducer;
