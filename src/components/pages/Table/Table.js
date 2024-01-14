import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import { getAllStatuts } from '../../../redux/statutsRedux';

const Table = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const statutsList = useSelector(getAllStatuts);

    const { id } = useParams();
    const table = useSelector(state => getTableById(state, id));  
    const findStatus = (statusId) => statutsList.find(status => status.id === statusId).statusName;

    if(!table) return <Navigate to="/" />;

    return(
    <div>
        <h1>Table</h1>
        <p>Chosen table number: {id} <br />
        Status: { findStatus(table.statusId) }<br />
        People: {table.peopleAmount} / {table.maxPeopleAmount} <br />
        Bill: $ {table.bill}
        </p>
    </div>
    );
};
    
export default Table;
