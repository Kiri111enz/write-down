import { SyntheticEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import styles from './../styles/SignUp.module.css';
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
    <Form className={styles.form} onSubmit={submit}>
        <h2>Sign Up</h2>
        <FormInput type="text" name="name"  placeholder="Username" description="@"></FormInput>
        <FormInput type="email" name="email"  placeholder="Email"></FormInput>
        <FormInput type="password" name="password" placeholder="Password"></FormInput>
        <FormInput type="password" placeholder="Repeat password"></FormInput>
        <Button variant="primary" type="submit">Submit</Button>
    </Form>  
);

export default SignUp;