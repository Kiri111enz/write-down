import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormStore } from 'stores/view/FormStore';
import { required } from 'utils/validator';
import FormInput from 'components/FormInput';
import Form from 'components/Form';
import { AppStoreContext } from 'App';
import { LogInRequestData } from 'services/auth';

const SignIn: React.FC = observer(() => {
    const navigate = useNavigate();
    const userStore = useContext(AppStoreContext).userStore;
    const formStore = useLocalObservable((): FormStore => (
        new FormStore({
            'name': [required],
            'password': [required],
        })
    ));

    const submit = async(event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const res = await userStore.logIn(data as unknown as LogInRequestData);
        if (res.success)
            navigate('/');
        else 
            alert(res.data);
    };

    return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <Form title="Sign In" store={formStore} method="POST" action="user/sign-in" onSubmit={submit}>
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
    );
});

export default SignIn;