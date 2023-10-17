import React, { useState } from "react";

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initailToken = localStorage.getItem('token')
  const [token, setToken] = useState(initailToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    // Check if the token is not null or empty before saving it in local storage
    if (token) {
      localStorage.setItem('token',JSON.stringify(token))
    }
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token')
  };
  if (token) {
    setTimeout(() => {
      console.log("calling logout handler");
      logoutHandler();
    }, 1000*60*5);
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;