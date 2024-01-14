import shortid from 'shortid';

//selectors
export const getAllTables = (state) => state.tables; 
export const getTableById = ({ tables }, id) => tables.find(table => table.id === id);

// actions names
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const ADD_TABLE = createActionName('ADD_TABLE');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const removeTable = payload => ({ type: REMOVE_TABLE, payload });

export const fetchTables = dispatch => {
  return (dispatch) => {
    fetch('http://localhost:3131/tables')
    .then(res => res.json())
    .then(tables => dispatch(updateTables(tables)));
  }
}

export const addTableRequest = newTable => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': "application/json"},
      body: JSON.stringify(newTable)
    };
    
    fetch('http://localhost:3131/tables', options)
    .then(() => dispatch(addTable(newTable)));
  }
}

export const editTableRequest = (chosenTable) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': "application/json"},
      body: JSON.stringify(chosenTable)
    };
    
    fetch(('http://localhost:3131/tables/'+chosenTable.id), options)
    .then(() => dispatch(editTable(chosenTable)));
  }
}

export const removeTableRequest = id => {
  return (dispatch) => {
    console.log("removeTableRequest: ", id)
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': "application/json"},
    };
    
    fetch(('http://localhost:3131/tables/'+id), options)
    .then(() => dispatch(removeTable(id)));
  }
}

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];   
    case ADD_TABLE:
      return [...statePart, { ...action.payload, id: shortid() }];         
      case EDIT_TABLE: 
      return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));      
    case REMOVE_TABLE:
      console.log("hello removing: ", action.payload);
      return statePart.filter(table => table.id !== action.payload);               
    default:
      return statePart;
  };
};

export default tablesReducer;
