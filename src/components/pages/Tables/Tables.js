import { getAllTables } from '../../../redux/tablesRedux';
import styles from './Tables.module.scss';
import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { removeTableRequest } from '../../../redux/tablesRedux';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getAllStatuts } from '../../../redux/statutsRedux';


const Tables = () => {
    const dispatch = useDispatch();  
    const statutsList = useSelector(getAllStatuts);
    const tablesList = useSelector(getAllTables); 

    const [show, setShow] = useState(false);
    const [id, setId] = useState('');
 
    const findStatus = (statusId) => statutsList.find(status => status.id === statusId).statusName;

    /*
        const [statusName, setStatusName] = useState('');
        const findStatus = (statusId) => { 
        console.log("!!!!!!!!!!!!!!!! statusId: ", statusId);
        const currentStatus = statutsList.find(status => status.id === statusId);
        setStatusName(currentStatus.statusName);
    }
    */

    const handleClose = () => { setShow(false);  }
    const handleShow = () => { setShow(true) }

    return(
    <>
        <h1>Tables</h1>
        <ListGroup className={styles.content}>
            {tablesList.map(table => 
                <ListGroup.Item  key={table.id}>
                <Row>
                    <Col>
                        <Nav.Link  as={NavLink} to={"/table/" + table.id}><span className={styles.bold}>Table number: </span> {table.id}</Nav.Link>
                    </Col>
                    <Col>
                        <span className={styles.bold}>Status: </span> 
                         { findStatus(table.statusId) }
                    </Col>
                    <Col>
                        <Button variant="outline-danger" className={styles.right} onClick={e => { handleShow(); setId(table.id)} }>
                            <Nav.Link as={NavLink} className={styles.butLinkRed}>DELETE</Nav.Link>
                        </Button>
                        <Button variant="outline-success" className={styles.right}>
                            <Nav.Link as={NavLink} to={"/tableEdit/" + table.id} className={styles.butLinkGreen}>EDIT</Nav.Link>
                        </Button>                          
                    </Col>                
                </Row>    
            </ListGroup.Item>
            )}
        </ListGroup>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This operation will completely remove this table from the database. Are you sure you want to do this?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" value={id} onClick={e => {  dispatch(removeTableRequest(id)); handleClose()}}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
};
    
export default Tables;

