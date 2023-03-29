import { ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FormStore } from './../stores/FormStore';

type FormInputProps = Omit<TextFieldProps, 'error' | 'helperText' | 'onChange'> & {
    formStore: FormStore
}

const FormInput = observer(({formStore, ...rest}: FormInputProps): JSX.Element => (
    // @ts-ignore
    <TextField {...rest}
        error={!!formStore.fields[rest.id].errorMsg}
        helperText={formStore.fields[rest.id].errorMsg}
        onChange={formStore ? ((event: ChangeEvent<HTMLInputElement>) => {
            formStore.onFieldChange(event.currentTarget.id, event.currentTarget.value);
        }) : undefined}>
    </TextField>
));

export default FormInput;