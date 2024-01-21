import initialState from "./initialState";
import { API_URL } from "../config";

//selectors
export const getAllStatuts = (state) => state.statuts.data;
export const getStatusById = ({ statuts }, id) =>
  statuts.data.find((statut) => statut.id === id);
export const isLoadingStatuts = (state) => state.statuts.isLoading;
export const isErrorStatuts = (state) => state.statuts.isError;

// actions names
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_STATUTS_LOADING = createActionName("UPDATE_STATUTS_LOADING");
const UPDATE_STATUTS_ERROR = createActionName("UPDATE_STATUTS_ERROR");
const UPDATE_STATUTS = createActionName("UPDATE_STATUTS");

// action creators
export const updateStatutsLoading = (payload) => ({
  type: UPDATE_STATUTS_LOADING,
  payload,
});
export const updateStatutsError = (payload) => ({
  type: UPDATE_STATUTS_ERROR,
  payload,
});
export const updateStatuts = (payload) => ({ type: UPDATE_STATUTS, payload });

export const fetchStatuts = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_STATUTS_LOADING, payload: true });
    fetch(API_URL + "/statuts")
      .then((res) => res.json())
      .then((statuts) => dispatch(updateStatuts(statuts)))
      .catch((err) => {
        dispatch({ type: UPDATE_STATUTS_ERROR, payload: true });
      });
  };
};

const statutsReducer = (statePart = initialState.statuts, action) => {
  switch (action.type) {
    case UPDATE_STATUTS_LOADING:
      return {
        data: statePart.data,
        isLoading: action.payload,
        isError: false,
      };
    case UPDATE_STATUTS_ERROR:
      return {
        data: statePart.data,
        isLoading: false,
        isError: action.payload,
      };
    case UPDATE_STATUTS:
      return { data: [...action.payload], isLoading: false, isError: false };
    default:
      return statePart;
  }
};

export default statutsReducer;
