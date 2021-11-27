// import action type

import {
  GET_ADDRESS_FAILED,
  GET_ADDRESS_INTERNAL_FAILED,
  GET_ADDRESS_INTERNAL_REQUEST,
  GET_ADDRESS_INTERNAL_SUCCESS,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_TRANSACTIONS_FAILED,
  GET_ADDRESS_TRANSACTIONS_REQUEST,
  GET_ADDRESS_TRANSACTIONS_SUCCESS,
} from "@Redux/actions/address/index";

const initialState = {
  isLoading: false,
  addr: {},
  error: {},
  show: false,
  transactions: [],
  internal_transactions: [],
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

    case GET_ADDRESS_INTERNAL_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        // isLoading: true,
        payload,
      };
    }

    case GET_ADDRESS_INTERNAL_SUCCESS: {
      const { internal_transactions } = action?.data;

      return {
        ...state,
        // isLoading: false,
        internal_transactions,
      };
    }

    case GET_ADDRESS_INTERNAL_FAILED: {
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
