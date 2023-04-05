import { InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormStore } from '../stores/view/FormStore';
import { required, email, equals} from '../utils/validator';
import { submit } from '../utils/http';
import FormInput from '../components/forms/FormInput';
import Form from '../components/Form';

const SignUpForm: React.FC = observer(() => {
    const equals_password = (s: string): string => 
        !equals(s, store.fields.password.value) ? 'Wrong password.' : '';

    const store = useLocalObservable((): FormStore => (
        new FormStore({
            'name': [required],
            'email': [required, email],
            'password': [required],
            'password-repeat': [required, equals_password]
        })
    ));

    return (
        <Form title="Sign Up" store={store} method="POST" action="user/sign-up" onSubmit={submit}>
            <FormInput id="name" type="text" name="name" label="Username"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <AccountCircle color={store.fields.name.errorMsg ? 'error' : 'inherit'}/>
                        </InputAdornment>
                    )
                }}></FormInput>
            <FormInput id="email" type="email" name="email" label="Email"></FormInput>
            <FormInput id="password" type="password" name="password" label="Password"></FormInput>
            <FormInput id="password-repeat" type="password" label="Repeat password"></FormInput>
        </Form>
    );
});

export default SignUpForm;