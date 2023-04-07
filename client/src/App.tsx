import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppStore from 'stores/domain/AppStore';
import RequireAuth from 'components/RequireAuth';
import Main from 'pages/Main';
import SignUp from 'pages/SignUp';

const AppStoreContext = createContext<AppStore>(undefined);

const App: React.FC = () => {
    const appStore = new AppStore();

    const router = createBrowserRouter([
        { path: '/', element: <RequireAuth><Main /></RequireAuth> },
        { path: '/sign-up', element: <SignUp returnPath='/'/>}
    ]);
    
    return (
        <AppStoreContext.Provider value={appStore}>
            <RouterProvider router={router} />
        </AppStoreContext.Provider>
    );
};

export default App;
export { AppStoreContext };