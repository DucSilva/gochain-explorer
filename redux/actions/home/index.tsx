export const GET_SUPPLY_STATS_REQUEST = "GET_SUPPLY_STATS_REQUEST";
export const GET_SUPPLY_STATS_SUCCESS = "GET_SUPPLY_STATS_SUCCESS";
export const GET_SUPPLY_STATS_FAILED = "GET_SUPPLY_STATS_FAILED";
export const GET_STATS_REQUEST = "GET_STATS_REQUEST";
export const GET_STATS_SUCCESS = "GET_STATS_SUCCESS";
export const GET_STATS_FAILED = "GET_STATS_FAILED";
export const GET_BLOCK_REQUEST = "GET_BLOCK_REQUEST";
export const GET_BLOCK_SUCCESS = "GET_BLOCK_SUCCESS";
export const GET_BLOCK_FAILED = "GET_BLOCK_FAILED";
export const TOAST_INFORMATION = "TOAST_INFORMATION";

export const getSupplyStats = (payload: any) => ({
  type: GET_SUPPLY_STATS_REQUEST,
  payload,
});

export const getSupplyStatsSuccess = (data: any) => {
  return {
    type: GET_SUPPLY_STATS_SUCCESS,
    data,
  };
};

export const getSupplyStatsFailed = (error: any) => ({
  type: GET_SUPPLY_STATS_FAILED,
  error,
});

export const getStats = (payload: any) => ({
  type: GET_STATS_REQUEST,
  payload,
});

export const getStatsSuccess = (data: any) => {
  return {
    type: GET_STATS_SUCCESS,
    data,
  };
};

export const getStatsFailed = (error: any) => ({
  type: GET_STATS_FAILED,
  error,
});

export const getBlock = (payload: any) => ({
  type: GET_BLOCK_REQUEST,
  payload,
});

export const getBlockSuccess = (data: any) => {
  return {
    type: GET_BLOCK_SUCCESS,
    data,
  };
};

export const getBlockFailed = (error: any) => ({
  type: GET_BLOCK_FAILED,
  error,
});

export const toastInformation = (payload: any) => ({
  type: TOAST_INFORMATION,
  payload,
});
