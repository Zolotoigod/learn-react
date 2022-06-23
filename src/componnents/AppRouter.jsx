import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/context';
import Error from '../pages/Error';
import Login from '../pages/Login';
import { privateRoutes, routes } from '../router';


const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);
    return (isAuth
        ?
        <Routes>
            {routes.map(route => 
                <Route key={route.path} path={route.path} element={route.element} exact={route.exact}/>
            )}
             {privateRoutes.map(route => 
                <Route key={route.path} path={route.path} element={route.element} exact={route.exact}/>
            )}
          <Route path='*' element={<Error/>}/>
        </Routes>
        :
        <Routes>
            {routes.map(route => 
                <Route key={route.path} path={route.path} element={route.element} exact={route.exact}/>
            )}
          <Route path='*' element={<Login/>}/>
        </Routes>
    );
};

export default AppRouter;