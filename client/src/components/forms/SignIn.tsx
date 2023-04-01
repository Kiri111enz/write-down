import { InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormStore } from './../../stores/FormStore';
import { required } from './utils/validator';
import { submit } from './utils/http';
import FormInput from './FormInput';
import Form from './Form';

const SignInForm: React.FC = observer(() => {
    const store = useLocalObservable((): FormStore => (
        new FormStore({
            'name': [required],
            'password': [required],
        })
    ));

    return (
        <Form title="Sign In" store={store} method="POST" action="user/sign-in" onSubmit={submit}>
            <FormInput id="name" type="text" name="name" label="Username"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <AccountCircle color={store.fields.name.errorMsg ? 'error' : 'inherit'}/>
                        </InputAdornment>
                    )
                }}></FormInput>
            <FormInput id="password" type="password" name="password" label="Password"></FormInput>
        </Form>
    );
});

export default SignInForm;