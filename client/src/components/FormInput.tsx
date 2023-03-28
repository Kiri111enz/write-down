import { ChangeEvent } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type FormInputProps = Omit<TextFieldProps, 'onChange'> & {
    onChange?(id: string, value: string): void
}

const FormInput = (props: FormInputProps): JSX.Element => (
    // @ts-ignore
    <TextField {...props}
        onChange={props.onChange ? ((event: ChangeEvent<HTMLInputElement>) => {
            props.onChange(event.currentTarget.id, event.currentTarget.value);
        }) : undefined}>
    </TextField>
);

export default FormInput;