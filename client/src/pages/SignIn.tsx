import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Snackbar, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormStore } from 'stores/view/FormStore';
import { required } from 'utils/validator';
import FormInput from 'components/FormInput';
import Form from 'components/Form';
import { AppStoreContext } from 'App';

const SignIn: React.FC = observer(() => {
    const userStore = useContext(AppStoreContext).userStore;
    const formStore = useLocalObservable((): FormStore => (
        new FormStore({
            'name': [required],
            'password': [required],
        }, userStore.logIn)
    ));

    const hideSnackbar = (): void => {
        formStore.resetAlertText();
    };

    return (
        <>
            <div className="position-absolute top-50 start-50 translate-middle border border-dark rounded">
                <Form title="Sign In" store={formStore} onSubmit={formStore.submit}>
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
            </div>
            {userStore.isAuthorized && <Navigate to="/" replace={true} />}
            <Snackbar open={!!formStore.alertText} autoHideDuration={5000} onClose={hideSnackbar}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert severity="error">{formStore.alertText}</Alert>
            </Snackbar>
        </>
    );
});

export default SignIn;