// import action type

import {
  GET_ADDRESS_FAILED,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_TRANSACTIONS_FAILED,
  GET_ADDRESS_TRANSACTIONS_REQUEST,
  GET_ADDRESS_TRANSACTIONS_SUCCESS
} from "@Redux/actions/address/index";

const initialState = {
  isLoading: false,
  addr: {},
  error: {},
  show: false,
  transactions: []
};

const addressReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ADDRESS_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        isLoading: true,
        payload,
      };
    }

    case GET_ADDRESS_SUCCESS: {
      const { data } = action;

      return {
        ...state,
        isLoading: false,
        addr: data,
      };
    }

    case GET_ADDRESS_FAILED: {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case GET_ADDRESS_TRANSACTIONS_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        // isLoading: true,
        payload,
      };
    }

    case GET_ADDRESS_TRANSACTIONS_SUCCESS: {
      const { transactions } = action?.data;

      return {
        ...state,
        // isLoading: false,
        transactions,
      };
    }

    case GET_ADDRESS_TRANSACTIONS_FAILED: {
      const { error } = action;
      return {
        ...state,
        // isLoading: false,
        error,
      };
    }

    default:
      return state;
  }
};

export default addressReducer;
