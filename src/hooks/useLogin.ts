import { useState } from 'react';
import { getUser } from '../lib/user';

export const useLogin = () => {
  const [auth, setAuth] = useState(false);

  const handleClickAuth = () => setAuth(true);

  const handleClickLogin = (userName: string) => {
    const user = getUser(userName);
    if (user) {
      setAuth(true);
    } else {
      alert('There is no data.');
    }
  };

  return {
    auth,
    login: handleClickLogin,
    register: handleClickAuth,
  };
};
