import { useContext } from 'react';
import { Link, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormStore } from 'stores/view/FormStore';
import { required } from 'utils/validator';
import FormInput from 'components/FormInput';
import Form from 'components/Form';
import FormPage from './FormPage';
import { AppStoreContext } from 'App';

const SignIn: React.FC<{ returnPath: string }> = observer((props) => {
    const userStore = useContext(AppStoreContext).userStore;
    const formStore = useLocalObservable((): FormStore => (
        new FormStore({
            'name': [required],
            'password': [required],
        }, userStore.signIn)
    ));

    return (
        <div className="text-center">
            <FormPage formStore={formStore} returnPath={props.returnPath}>
                <Form title="Sign In" store={formStore}>
                    <FormInput id="name" type="text" name="name" label="Username"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle color={formStore.fields.name.errorMsg ? 'error' : 'inherit'}/>
                                </InputAdornment>
                            )
                        }}></FormInput>
                    <FormInput id="password" type="password" name="password" label="Password"></FormInput>
                </Form>
            </FormPage>
            <div className="text-muted fixed-bottom my-3">
                <span>Dont't have an account yet? </span>
                <Link href="/sign-up" variant="body2">Sign Up</Link>
            </div>
        </div>
    );
});

export default SignIn;