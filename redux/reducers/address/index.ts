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
  GET_CONTRACT_FAILED,
  GET_CONTRACT_REQUEST,
  GET_CONTRACT_SUCCESS,
  GET_OWNED_TOKENS_FAILED,
  GET_OWNED_TOKENS_REQUEST,
  GET_OWNED_TOKENS_SUCCESS,
  GET_TOKEN_HOLDERS_FAILED,
  GET_TOKEN_HOLDERS_REQUEST,
  GET_TOKEN_HOLDERS_SUCCESS,
  GET_TOKEN_TXS_FAILED,
  GET_TOKEN_TXS_REQUEST,
  GET_TOKEN_TXS_SUCCESS,
} from "@Redux/actions/address/index";

const initialState = {
  isLoading: false,
  addr: {},
  error: {},
  show: false,
  transactions: [],
  internal_transactions: [],
  token_holders: [],
  token_transactions: [],
  owned_tokens: [],
  contract: [],
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

    case GET_TOKEN_HOLDERS_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        // isLoading: true,
        payload,
      };
    }

    case GET_TOKEN_HOLDERS_SUCCESS: {
      const { token_holders } = action?.data;

      return {
        ...state,
        // isLoading: false,
        token_holders,
      };
    }

    case GET_TOKEN_HOLDERS_FAILED: {
      const { error } = action;
      return {
        ...state,
        // isLoading: false,
        error,
      };
    }

    case GET_TOKEN_TXS_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        // isLoading: true,
        payload,
      };
    }

    case GET_TOKEN_TXS_SUCCESS: {
      const { token_transactions } = action?.data;

      return {
        ...state,
        // isLoading: false,
        token_transactions,
      };
    }

    case GET_TOKEN_TXS_FAILED: {
      const { error } = action;
      return {
        ...state,
        // isLoading: false,
        error,
      };
    }

    case GET_OWNED_TOKENS_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        // isLoading: true,
        payload,
      };
    }

    case GET_OWNED_TOKENS_SUCCESS: {
      const { owned_tokens } = action?.data;

      return {
        ...state,
        // isLoading: false,
        owned_tokens,
      };
    }

    case GET_OWNED_TOKENS_FAILED: {
      const { error } = action;
      return {
        ...state,
        // isLoading: false,
        error,
      };
    }

    case GET_CONTRACT_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        // isLoading: true,
        payload,
      };
    }

    case GET_CONTRACT_SUCCESS: {
      const { contract } = action?.data;

      return {
        ...state,
        // isLoading: false,
        contract,
      };
    }

    case GET_CONTRACT_FAILED: {
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
