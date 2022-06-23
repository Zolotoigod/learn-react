import React, { useEffect, useState } from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./componnents/AppRouter";
import Navbar from "./componnents/UI/Navbar/Navbar";
import { AuthContext } from "./context/context";
import './styles/app.css'

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('auth')){
      setIsAuth(true);
    }
  }, []);

  return (
    
    <BrowserRouter>
      <AuthContext.Provider value={{
          isAuth,
          setIsAuth,
        }}>
        <Navbar/>
        <AppRouter/>
      </AuthContext.Provider>
    </BrowserRouter>
    
  );
}

export default App;