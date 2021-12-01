import {
  OPEN_WALLET_FAILED,
  OPEN_WALLET_REQUEST,
  OPEN_WALLET_SUCCESS,
  SET_ACCOUNT_BALANCE,
} from "@Redux/actions/wallet";

const initialState = {
  isLoading: false,
  isProcessing: false,
  account: {},
  accountBalance: 0,
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

    default:
      return state;
  }
};

export default walletReducer;
