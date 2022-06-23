import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/context';
import MyButton from '../Button/MyButton';

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const signOut = () =>{
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className="navbar">
            <Link className="navbar_links" to="/">Main</Link>
            <Link className="navbar_links" to="/posts">Posts</Link>
            {isAuth 
                ? <MyButton style={{color:'white'}} onClick={() => signOut()}>
                    Sign out
                </MyButton>
                :<Link className="navbar_links" to="/login">Sign in</Link>
            }
        </div>
    );
};

export default Navbar;