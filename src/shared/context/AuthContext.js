import React, { useState, createContext, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttpClient } from '../hooks/http-hook';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const { sendRequest } = useHttpClient();
  const storedData = JSON.parse(localStorage.getItem('userData'));

  const [csrfToken, setCsrfToken] = useState(null);
  const [isToken, setIsToken] = useState(null);
  const [userId, setUserId] = useState(!storedData ? null : storedData.userId);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(
    !storedData ? null : storedData.expiration
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const data = await sendRequest('crsf-token');
        setCsrfToken(data.csrfToken);
      } catch (error) {}
    };

    getCsrfToken();
  }, [sendRequest]);

  const setAuth = ({ userId, token, expirationDate }) => {
    const myTokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: userId,
        expiration: myTokenExpirationDate.toISOString(),
      })
    );

    setUserId(userId);
    setIsToken(token);
    setTokenExpirationDate(myTokenExpirationDate);
  };

  const logOut = () => {
    localStorage.removeItem('userData');

    setUserId(null);
    setIsToken(null);
    setTokenExpirationDate(null);

    history.push('/auth');
  };

  const isAuthenticated = () => {
    if (!isToken && !tokenExpirationDate) {
      return false;
    }

    return new Date(storedData.expiration) > new Date();
  };

  return (
    <Provider
      value={{
        userId,
        csrfToken,
        isAuthenticated,
        setLogin: (authInfo) => setAuth(authInfo),
        logOut,
      }}
    >
      {children}
    </Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
