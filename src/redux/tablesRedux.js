import shortid from "shortid";
import initialState from "./initialState";
import { API_URL } from "../config";

//selectors
export const getAllTables = (state) => state.tables.data;
export const getTableById = ({ tables }, id) =>
  tables.data.find((table) => table.id === id);
export const isLoadingTables = (state) => state.tables.isLoading;
export const isErrorTables = (state) => state.tables.isError;

// actions names
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLES_LOADING = createActionName("UPDATE_TABLES_LOADING");
const UPDATE_TABLES_ERROR = createActionName("UPDATE_TABLES_ERROR");
const UPDATE_TABLES = createActionName("UPDATE_TABLES");
const ADD_TABLE = createActionName("ADD_TABLE");
const EDIT_TABLE = createActionName("EDIT_TABLE");
const REMOVE_TABLE = createActionName("REMOVE_TABLE");

// action creators
export const updateTablesLoading = (payload) => ({
  type: UPDATE_TABLES_LOADING,
  payload,
});
export const updateTablesError = (payload) => ({
  type: UPDATE_TABLES_ERROR,
  payload,
});
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const addTable = (payload) => ({ type: ADD_TABLE, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });
export const removeTable = (payload) => ({ type: REMOVE_TABLE, payload });

export const fetchTables = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_TABLES_LOADING, payload: true });
    fetch(API_URL + "/tables")
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)))
      .catch((err) => {
        dispatch({ type: UPDATE_TABLES_ERROR, payload: true });
      });
  };
};

export const addTableRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTable),
    };

    fetch(API_URL + "/tables", options).then(() =>
      dispatch(addTable(newTable))
    );
  };
};

export const editTableRequest = (chosenTable) => {
  return (dispatch) => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chosenTable),
    };

    fetch(API_URL + "/tables/" + chosenTable.id, options).then(() =>
      dispatch(editTable(chosenTable))
    );
  };
};

export const removeTableRequest = (id) => {
  return (dispatch) => {
    console.log("removeTableRequest: ", id);
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(API_URL + "/tables/" + id, options).then(() =>
      dispatch(removeTable(id))
    );
  };
};

const tablesReducer = (statePart = initialState.tables, action) => {
  switch (action.type) {
    case UPDATE_TABLES_LOADING:
      return {
        data: statePart.data,
        isLoading: action.payload,
        isError: false,
      };
    case UPDATE_TABLES_ERROR:
      return {
        data: statePart.data,
        isLoading: false,
        isError: action.payload,
      };
    case UPDATE_TABLES:
      return { data: [...action.payload], isLoading: false, isError: false };
    case ADD_TABLE:
      return {
        data: [...statePart.data, { ...action.payload, id: shortid() }],
        isLoading: false,
        isError: false,
      };
    case EDIT_TABLE:
      return {
        data: statePart.data.map((table) =>
          table.id === action.payload.id
            ? { ...table, ...action.payload }
            : table
        ),
        isLoading: false,
        isError: false,
      };
    case REMOVE_TABLE:
      return {
        data: statePart.data.filter((table) => table.id !== action.payload),
        isLoading: false,
        isError: false,
      };
    default:
      return statePart;
  }
};

export default tablesReducer;
