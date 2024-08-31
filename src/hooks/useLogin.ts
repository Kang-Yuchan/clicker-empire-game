import { useState } from 'react';
import { getUser } from '../lib/user';
import { User } from '../types';
import { DEFAULT_USER_DATA } from '../lib/constants';

export const useLogin = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleClickuser = (userName: string) =>
    setUser({
      ...DEFAULT_USER_DATA,
      name: userName,
    });

  const handleClickLogin = (userName: string) => {
    const user = getUser(userName);
    if (user) {
      setUser(user);
    } else {
      alert('There is no data.');
    }
  };

  const handleClickLogout = () => {
    setUser(null);
  };

  return {
    user,
    login: handleClickLogin,
    register: handleClickuser,
    logout: handleClickLogout,
  };
};
