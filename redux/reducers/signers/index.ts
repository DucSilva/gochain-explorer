import {
  GET_SIGNER_LIST_FAILED,
  GET_SIGNER_LIST_REQUEST,
  GET_SIGNER_LIST_SUCCESS,
  GET_SIGNER_STATS_FAILED,
  GET_SIGNER_STATS_REQUEST,
  GET_SIGNER_STATS_SUCCESS,
} from "@Redux/actions/signers/index";

const initialState = {
  isLoading: false,
  signers: [],
  statsData: [],
};

const signerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SIGNER_LIST_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        isLoading: true,
        payload,
      };
    }

    case GET_SIGNER_LIST_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        isLoading: false,
        signers: data,
      };
    }

    case GET_SIGNER_LIST_FAILED: {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case GET_SIGNER_STATS_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        isLoading: true,
        payload,
      };
    }

    case GET_SIGNER_STATS_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        isLoading: false,
        statsData: data,
      };
    }

    case GET_SIGNER_STATS_FAILED: {
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

export default signerReducer;
