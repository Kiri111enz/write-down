import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import styles from './../styles/FormInput.module.css';

interface FormInputProps {
    type: string,
    name?: string,
    placeholder?: string,
    description?: string
    error?: string,
    onChange?(name: string, value: string): void
}

const FormInput = (props: FormInputProps): JSX.Element => (
    <InputGroup className={styles['form-input']}>
        {!!props.description && <InputGroup.Text id="description">{props.description}</InputGroup.Text>}
        <Form.Control className="form-input" {...props} 
            aria-describedby="description"
            isInvalid={!!props.error}
            onChange={props.onChange ? ((event) => props.onChange(event.target.name, event.target.value)) : undefined}/>
        <Form.Control.Feedback type="invalid">{props.error}</Form.Control.Feedback>
    </InputGroup>
);

export default FormInput;