import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpForm from './forms/SignUp';

const App = (): JSX.Element => (
    <div className="position-absolute top-50 start-50 translate-middle">
        <SignUpForm />
    </div>
);

export default App;