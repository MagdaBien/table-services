import Button from "react-bootstrap/Button";
import styles from "./TableItem.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";

const TableItem = (props) => {
  function findStatus(id) {
    const stat = props.statuts.find((status) => status.id === id);
    //console.log("stat", stat);
    if (stat !== undefined) return stat.statusName;
  }

  return (
    <ListGroup.Item>
      <Row>
        <Col>
          <Nav.Link as={NavLink} to={"/table/" + props.id}>
            <span className={styles.bold}>Table number: </span> {props.id}
          </Nav.Link>
        </Col>
        <Col>
          <span className={styles.bold}>Status: </span>
          {findStatus(props.statusId)}
        </Col>
        <Col>
          <Button
            variant="outline-danger"
            className={styles.right}
            onClick={(e) => {
              props.handleShow();
              props.setId(props.id);
            }}
          >
            <Nav.Link as={NavLink} className={styles.butLinkRed}>
              DELETE
            </Nav.Link>
          </Button>
          <Button variant="outline-success" className={styles.right}>
            <Nav.Link
              as={NavLink}
              to={"/tableEdit/" + props.id}
              className={styles.butLinkGreen}
            >
              EDIT
            </Nav.Link>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default TableItem;
