import { useContext } from 'react';
import { Link, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormStore } from 'stores/view/FormStore';
import { required, email, equals } from 'utils/validator';
import FormInput from 'components/FormInput';
import Form from 'components/Form';
import FormPage from './FormPage';
import { AppStoreContext } from 'App';

const SignUp: React.FC<{ returnPath: string }> = observer((props) => {
    const equals_password = (s: string): string => 
        !equals(s, formStore.fields.password.value) ? 'Wrong password.' : '';

    const userStore = useContext(AppStoreContext).userStore;
    const formStore = useLocalObservable((): FormStore => (
        new FormStore({
            'name': [required],
            'email': [required, email],
            'password': [required],
            'password-repeat': [required, equals_password]
        }, userStore.signUp)
    ));

    return (
        <div className="text-center">
            <FormPage formStore={formStore} returnPath={props.returnPath}>
                <Form title="Sign Up" store={formStore}>
                    <FormInput id="name" type="text" name="name" label="Username"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle color={formStore.fields.name.errorMsg ? 'error' : 'inherit'}/>
                                </InputAdornment>
                            )
                        }}></FormInput>
                    <FormInput id="email" type="email" name="email" label="Email"></FormInput>
                    <FormInput id="password" type="password" name="password" label="Password"></FormInput>
                    <FormInput id="password-repeat" type="password" label="Repeat password"></FormInput>
                </Form>
            </FormPage>
            <div className="text-muted fixed-bottom my-3">
                <span>Already have an account? </span>
                <Link href="/sign-in" variant="body2">Sign In</Link>
            </div>
        </div>
    );
});

export default SignUp;