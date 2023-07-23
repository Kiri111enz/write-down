import { useContext, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { AppStoreContext } from 'App';
import AuthStore from 'stores/domain/AuthStore';

const RequireAuth: React.FC<PropsWithChildren> = observer(props => {
    const appStore = useContext(AppStoreContext);
    const authStore = useLocalObservable<AuthStore>(() => appStore.authStore);
    
    return authStore.isInitializing ? <CircularProgress className="position-absolute top-50 start-50 translate-middle"/> :
        authStore.isAuthorized ? <>{props.children}</> : <Navigate to="/sign-in" />;
});

export default RequireAuth;