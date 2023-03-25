import { SyntheticEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import styles from './../styles/SignUp.module.css';

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

const SignUp = (): JSX.Element => {
    return (
        <Form id={styles.form} onSubmit={submit}>
            <h2>Sign Up</h2>
            <Form.Control name="name" type="text" placeholder="Username"/>
            <Form.Control name="email" type="email" placeholder="Email"/>
            <Form.Control name="password" type="password" placeholder="Password"/>
            <Form.Control type="password" placeholder="Repeath password"/>
            <Button variant="primary" type="submit">Sumbit</Button>
        </Form>
    );
};

export default SignUp;