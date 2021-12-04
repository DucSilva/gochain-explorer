import {
  CLOSE_ACCOUNT,
  CREATE_ACCOUNT_FAILED,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  GET_WALLET_ADDR_FAILED,
  GET_WALLET_ADDR_REQUEST,
  GET_WALLET_ADDR_SUCCESS,
  OPEN_WALLET_FAILED,
  OPEN_WALLET_REQUEST,
  OPEN_WALLET_SUCCESS,
  RESET_PROCESSING,
  SEND_GO_FAILED,
  SEND_GO_REQUEST,
  SEND_GO_SUCCESS,
  SET_ACCOUNT_BALANCE,
} from "@Redux/actions/wallet";

const initialState = {
  isLoading: false,
  isProcessing: false,
  account: {},
  accountBalance: 0,
  addr: {},
  receipt: null,
};

const walletReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_WALLET_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        isProcessing: true,
        payload,
      };
    }

    case OPEN_WALLET_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        isProcessing: false,
        account: data,
      };
    }

    case OPEN_WALLET_FAILED: {
      const { error } = action;
      return {
        ...state,
        isProcessing: false,
        error,
      };
    }

    case SET_ACCOUNT_BALANCE: {
      const { payload } = action;
      return {
        ...state,
        isProcessing: false,
        accountBalance: payload,
      };
    }

    case GET_WALLET_ADDR_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        isLoading: true,
        payload,
      };
    }

    case GET_WALLET_ADDR_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        isLoading: false,
        addr: data,
      };
    }

    case GET_WALLET_ADDR_FAILED: {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case CLOSE_ACCOUNT: {
      const { account, accountBalance } = action?.payload;
      return {
        ...state,
        isLoading: false,
        isProcessing: false,
        account,
        accountBalance,
      };
    }

    case RESET_PROCESSING: {
      const { receipt } = action?.payload;
      return {
        ...state,
        isProcessing: false,
        receipt,
      };
    }

    case CREATE_ACCOUNT_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        payload,
      };
    }

    case CREATE_ACCOUNT_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        account: data,
      };
    }

    case CREATE_ACCOUNT_FAILED: {
      const { error } = action;
      return {
        ...state,
        error,
      };
    }

    case SEND_GO_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        payload,
        isProcessing: true,
      };
    }

    case SEND_GO_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        // account: data,
        isProcessing: false,
      };
    }

    case SEND_GO_FAILED: {
      const { error } = action;
      return {
        ...state,
        error,
        isProcessing: false,
      };
    }

    default:
      return state;
  }
};

export default walletReducer;
