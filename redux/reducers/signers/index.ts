import {
  GET_SIGNER_LIST_FAILED,
  GET_SIGNER_LIST_REQUEST,
  GET_SIGNER_LIST_SUCCESS,
} from "@Redux/actions/signers/index";

const initialState = {
  isLoading: false,
  signers: [],
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

    default:
      return state;
  }
};

export default signerReducer;
