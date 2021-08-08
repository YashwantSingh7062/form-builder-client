import { Spinner} from 'react-bootstrap';
import styles from './loader.module.css';
const Loading = () => {
    return <div className={styles.loaderDiv}>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
}

export default Loading;