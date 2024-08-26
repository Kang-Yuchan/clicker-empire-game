import { User } from '../types';

export const getUser = (userName: string): User | null => {
  const storedUser = localStorage.getItem(userName);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const saveUser = (userName: string, userData: User) => {
  localStorage.setItem(userName, JSON.stringify(userData));
};
