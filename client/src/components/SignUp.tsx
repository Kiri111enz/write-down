import { SyntheticEvent } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import FormInput from './FormInput';

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

const SignUp = (): JSX.Element => (
    <Stack className="z-index-1 p-2 bg-white rounded text-center"
        component="form" onSubmit={submit}
        spacing={1.3}
        noValidate>
        <h2>Sign Up</h2>
        <FormInput type="text" name="name" 
            label="Username" size="small" 
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <AccountCircle />
                    </InputAdornment>
                )
            }}></FormInput>
        <FormInput type="email" name="email" 
            label="Email" size="small"></FormInput>
        <FormInput type="password" name="password" 
            label="Password" size="small"></FormInput>
        <FormInput type="password" 
            label="Repeat password" size="small"></FormInput>
        <Button variant="contained" type="submit">Submit</Button>
    </Stack>
);

export default SignUp;