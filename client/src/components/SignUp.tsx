import { SyntheticEvent } from 'react';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import FormInput from './FormInput';
import { FormStore } from './../stores/FormStore';
import { required, email, equals} from './../utils/validator';

const equals_password = (s: string): string => 
    !equals(s, signUpStore.fields.password.value) ? 'Wrong password.' : '';

const signUpStore = new FormStore({
    'name': [required],
    'email': [required, email],
    'password': [required],
    'password-repeat': [required, equals_password]
});

const submit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    await axios
        .post('user/sign-up', new FormData(form), 
            { headers: { 'Content-Type': 'application/json' } })
        .then((data) => {
            alert('Success!');
            console.log(data);
        })
        .catch((err) => alert(err));
};

const SignUpForm = observer(({store}: {store: FormStore}): JSX.Element => (
    <Stack className="z-index-1 p-2 bg-white rounded text-center"
        component="form" onSubmit={submit}
        spacing={1.3}
        noValidate>
        <h2>Sign Up</h2>
        <FormInput id="name" type="text" name="name" 
            label="Username" size="small"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <AccountCircle color={store.fields['name'].errorMsg ? 'error' : 'inherit'}/>
                    </InputAdornment>
                )
            }}
            formStore={store}></FormInput>
        <FormInput id="email" type="email" name="email" 
            label="Email" size="small"
            formStore={store}></FormInput>
        <FormInput id="password" type="password" name="password" 
            label="Password" size="small"
            formStore={store}></FormInput>
        <FormInput id="password-repeat" type="password" 
            label="Repeat password" size="small"
            formStore={store}></FormInput>
        <Button variant="contained" type="submit" 
            disabled={!store.allValid}>Submit</Button>
    </Stack>
));

export { SignUpForm, signUpStore };