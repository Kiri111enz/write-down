import { useContext, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppStoreContext } from '../App';

const RequireAuth: React.FC<PropsWithChildren> = (props) => {
    const userStore = useContext(AppStoreContext).userStore;
    
    if (userStore.isAuthorized)
        return props.children;
    else 
        return <Navigate to="/sign-in" />;
};

export default RequireAuth;