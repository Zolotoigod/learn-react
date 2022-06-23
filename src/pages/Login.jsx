import React, { useContext } from 'react';
import MyButton from '../componnents/UI/Button/MyButton';
import MyInput from '../componnents/UI/Input/MyInput';
import { AuthContext } from '../context/context';

const Login = () => {
    const {setIsAuth} = useContext(AuthContext);
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    }

    return (
        <div>
            <h1>Loging page</h1>
            <form onSubmit={login}>
                <MyInput type='text' placeholder='Login'/>
                <MyInput type='password' placeholder='password'/>
                <MyButton>Sign in</MyButton>
            </form>
        </div>
    );
};

export default Login;