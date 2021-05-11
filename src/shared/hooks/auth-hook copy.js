import { useState, useCallback, useEffect } from 'react';

let logOutTimer; // set timer for logout expirations

export const useAuth = () => {
  const [isToken, setIsToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setIsToken(token);
    setUserId(uid);

    // Set Expiration for user token
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    // expirationDate || new Date(new Date().getTime() + 1000 * 2);
    setTokenExpirationDate(tokenExpirationDate);

    // Set token to LocalStorage
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logOut = useCallback(() => {
    setIsToken(null);
    setUserId(null);
    setTokenExpirationDate(null);

    localStorage.removeItem('userData');
  }, []);

  useEffect(
    (isToken) => {
      if (isToken && tokenExpirationDate) {
        const remainingTime =
          tokenExpirationDate.getTime() - new Date().getTime;

        logOutTimer = setTimeout(logOut, remainingTime);
      } else {
        clearTimeout(logOutTimer);
      }
    },
    [isToken, logOut, tokenExpirationDate]
  );

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { userId, isToken, login, logOut };
};
