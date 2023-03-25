import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './../styles/App.module.css';
import SignUp from './SignUp';

const App = (): JSX.Element => {
    return (
        <div className={styles['absolute-centered']}>
            <SignUp/>
        </div>
    );
};

export default App;