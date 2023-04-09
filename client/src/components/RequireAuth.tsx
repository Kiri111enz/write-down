import { useContext, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppStoreContext } from 'App';
import { observer, useLocalObservable } from 'mobx-react-lite';
import UserStore from 'stores/domain/UserStore';

const RequireAuth: React.FC<PropsWithChildren> = observer((props) => {
    const appStore = useContext(AppStoreContext);
    const userStore = useLocalObservable((): UserStore => appStore.userStore);
    
    return (
        userStore.isAuthorized ? <>{props.children}</> : <Navigate to="/sign-in" />
    );
});

export default RequireAuth;