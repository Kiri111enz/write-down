import { useContext } from 'react';
import { Button } from '@mui/material';
import { AppStoreContext } from 'App';

const Main: React.FC = () => {
    const userStore = useContext(AppStoreContext).userStore;

    const logOut = async (): Promise<void> => {
        await userStore.signOut();  
    };

    return (
        <>
            <h1>Write Down is here!</h1>
            <Button variant="contained" onClick={logOut}>Sign Out</Button>
        </>
    );
};

export default Main;