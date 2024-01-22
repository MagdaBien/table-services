import { getAllTables } from "../../../redux/tablesRedux";
import styles from "./Tables.module.scss";
import { useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { removeTableRequest } from "../../../redux/tablesRedux";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import TableItem from "../../views/TableItem/TableItem";
import { isLoadingTables } from "../../../redux/tablesRedux";
import { isErrorTables } from "../../../redux/tablesRedux";
import { isLoadingStatuts } from "../../../redux/statutsRedux";
import { isErrorStatuts } from "../../../redux/statutsRedux";

const Tables = () => {
  const dispatch = useDispatch();

  const tablesList = useSelector(getAllTables);

  const isLoadingDataTables = useSelector(isLoadingTables);
  const isErrorDataTables = useSelector(isErrorTables);
  const isLoadingDataStatuts = useSelector(isLoadingStatuts);
  const isErrorDataStatuts = useSelector(isErrorStatuts);

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  if (isLoadingDataTables || isLoadingDataStatuts) {
    return <p>Loading ...</p>;
  }

  if (isErrorDataTables || isErrorDataStatuts) {
    return <p>Error ...</p>;
  }

  if (tablesList.length === 0) {
    return <p>No data ...</p>;
  }

  //console.log("statutsList: ", statutsList);
  //console.log("tablesList: ", tablesList);

  return (
    <>
      <h1>Tables</h1>
      <ListGroup className={styles.content}>
        {tablesList.map((table) => (
          <TableItem
            key={table.id}
            handleShow={handleShow}
            setId={setId}
            {...table}
          ></TableItem>
        ))}
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This operation will completely remove this table from the database.
          Are you sure you want to do this?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            value={id}
            onClick={(e) => {
              dispatch(removeTableRequest(id));
              handleClose();
            }}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Tables;
