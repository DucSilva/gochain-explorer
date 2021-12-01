// import action type

import {
  GET_BLOCK_FAILED,
  GET_BLOCK_REQUEST,
  GET_BLOCK_SUCCESS,
  GET_STATS_FAILED,
  GET_STATS_REQUEST,
  GET_STATS_SUCCESS,
  GET_SUPPLY_STATS_FAILED,
  GET_SUPPLY_STATS_REQUEST,
  GET_SUPPLY_STATS_SUCCESS,
  TOAST_INFORMATION,
} from "@Redux/actions/home/index";

const initialState = {
  isLoading: false,
  supplyStats: {},
  stats: {},
  blocks: {},
  error: {},
  show: false,
  status: '',
};

const homeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SUPPLY_STATS_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        isLoading: true,
        payload,
      };
    }

    case GET_SUPPLY_STATS_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        isLoading: false,
        supplyStats: data,
      };
    }

    case GET_SUPPLY_STATS_FAILED: {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case GET_STATS_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        isLoading: true,
        payload,
      };
    }

    case GET_STATS_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        isLoading: false,
        stats: data,
      };
    }

    case GET_STATS_FAILED: {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case GET_BLOCK_REQUEST: {
      const { payload } = action;
      return {
        ...state,
        isLoading: true,
        payload,
      };
    }

    case GET_BLOCK_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        isLoading: false,
        blocks: data,
      };
    }

    case GET_BLOCK_FAILED: {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case TOAST_INFORMATION: {
      const { show, content, status } = action?.payload;
      return {
        ...state,
        show,
        message: content,
        status
      };
    }

    default:
      return state;
  }
};

export default homeReducer;
