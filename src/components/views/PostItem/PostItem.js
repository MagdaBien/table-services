import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './PostItem.module.scss';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import clsx from 'clsx';
import date2string from '../../../utils/dateToStr';
import { useSelector } from 'react-redux';
import { getCategoryById } from '../../../redux/categoriesRedux';

const PostItem = (props) => {
    const url = "/post/" + props.id;
    const category = useSelector(state => getCategoryById(state, props.categoryId));
    
    return(
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
    <Card className={clsx(styles.cardArticle)}>
        <Card.Body>
            <h5 className={styles.cardTitle}>{props.title}</h5>
            <p className={styles.author}>
                <span className={styles.bold}>Autor:</span> {props.author}<br />
                <span className={styles.bold}>Published:</span> {date2string(props.publishedDate, '-')}<br />
                <span className={styles.bold}>Category:</span>  {category.categoryName}
            </p>
            <p className={styles.description}>{props.shortDescription}</p>
            <Button variant="primary" className={styles.but}>
                    <Nav.Link as={NavLink} to={url} className={styles.butLink}>Read more</Nav.Link>
                </Button>            
        </Card.Body>
    </Card>
    </div>
    );
};
    
export default PostItem;