import { useContext, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { TextField, TextFieldProps } from '@mui/material';
import { FormStoreContext } from './Form';

type FormInputProps = Omit<TextFieldProps, 'error' | 'helperText' | 'onChange'>;

const FormInput = observer((props: FormInputProps): JSX.Element => {
    const formStore = useContext(FormStoreContext);
    return (
        // @ts-ignore
        <TextField {...props}
            size={props.size ? props.size : 'small'}
            error={!!formStore.fields[props.id].errorMsg}
            helperText={formStore.fields[props.id].errorMsg}
            onChange={formStore ? ((event: ChangeEvent<HTMLInputElement>) => {
                formStore.onFieldChange(event.currentTarget.id, event.currentTarget.value);
            }) : undefined}>
        </TextField>
    );
});

export default FormInput;