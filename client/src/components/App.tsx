import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp';

const App = (): JSX.Element => {
    return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <SignUp/>
        </div>
    );
};

export default App;