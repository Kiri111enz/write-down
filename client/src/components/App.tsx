import 'bootstrap/dist/css/bootstrap.min.css';
import { SignUpForm, signUpStore } from './SignUp';

const App = (): JSX.Element => (
    <div className="position-absolute top-50 start-50 translate-middle">
        <SignUpForm store={signUpStore}/>
    </div>
);

export default App;