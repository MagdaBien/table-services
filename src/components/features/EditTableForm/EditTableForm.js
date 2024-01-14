import { useDispatch } from 'react-redux';
import { editTableRequest } from '../../../redux/tablesRedux';
import { useNavigate } from 'react-router-dom';
import TableForm from '../TableForm/TableForm';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getTableById } from '../../../redux/tablesRedux';
import { Navigate } from 'react-router-dom';


const EditTableForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const form = useSelector(state => getTableById(state, id));    
    if(!form) return <Navigate to="/" />;


    const handleSubmit = form => {
        dispatch(editTableRequest(form));     
        navigate("/");
    }

	return (
        <TableForm actionHandle={handleSubmit} buttonName="UPDATE" formState={form}></TableForm>
	);

};

export default EditTableForm;

