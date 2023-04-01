import 'bootstrap/dist/css/bootstrap.min.css';
import SignInForm from './forms/SignIn';

const App: React.FC = () => (
    <div className="position-absolute top-50 start-50 translate-middle">
        <SignInForm />
    </div>
);

export default App;