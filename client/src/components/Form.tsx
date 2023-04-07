import { createContext, PropsWithChildren } from 'react';
import { Stack, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FormStore } from 'stores/view/FormStore';

interface FormProps {
    title: string;
    store: FormStore;
    onSubmit: (data: FormData) => Promise<void>;
}

const submit = async (event: React.FormEvent, onSubmit: (data: FormData) => Promise<void>): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    await onSubmit(data);
};

const FormStoreContext = createContext<FormStore>(undefined);

const Form: React.FC<PropsWithChildren<FormProps>> = observer((props) => {
    const { onSubmit, ...rest } = props;
    return (
        <Stack className="z-index-1 p-2 bg-white rounded text-center"
            component="form" onSubmit={async event => await submit(event, onSubmit)} {...rest}
            spacing={1.3}
            noValidate>
            <h2>{props.title}</h2>
            <FormStoreContext.Provider value={props.store}>
                {props.children}
            </FormStoreContext.Provider>
            <Button variant="contained" type="submit" 
                disabled={!props.store.allValid}>Submit</Button>
        </Stack>
    );
});

export default Form;
export { FormStoreContext };