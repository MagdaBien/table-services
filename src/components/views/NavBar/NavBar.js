import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from './NavBar.module.scss';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return(
    <Navbar variant="dark" bg="primary" data-bs-theme="light" className={styles.bgprimary}>
    <Container>
        <Navbar.Brand>Table Service</Navbar.Brand>
        <Nav>
            <Nav.Link as={NavLink} to="/">Tables</Nav.Link>  
            <Nav.Link as={NavLink} to="/tableAdd">Add table</Nav.Link>      
        </Nav>
    </Container>
    </Navbar>
    );
};
    
export default NavBar;
