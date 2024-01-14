//selectors
export const getAllStatuts = (state) => state.statuts; 
export const getStatusById = ({ statuts }, id) => statuts.find(statut => statut.id === id);

// actions names
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_STATUTS = createActionName('UPDATE_STATUTS');

// action creators
export const updateStatuts = payload => ({ type: UPDATE_STATUTS, payload });


export const fetchStatuts = dispatch => {
  return (dispatch) => {
    fetch('http://localhost:3131/statuts')
    .then(res => res.json())
    .then(statuts => dispatch(updateStatuts(statuts)));
  }
}

const statutsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_STATUTS:
      return [...action.payload];            
    default:
      return statePart;
  };
};

export default statutsReducer;
