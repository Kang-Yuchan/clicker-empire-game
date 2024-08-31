import { useEffect, useState } from 'react';
import { Item, User } from '../types';
import { DEFAULT_USER_DATA, MONEY_AS_ONE_CLICK } from '../lib/constants';
import { saveUser } from '../lib/user';

type UseGameProps = {
  user: User;
  logout: () => void;
};

export const useGame = ({ user, logout }: UseGameProps) => {
  const [initialUser, setInitialUser] = useState<User>(user);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleClickBurger = () => {
    setInitialUser({
      ...initialUser,
      clickCount: initialUser.clickCount + 1,
      money: initialUser.money + MONEY_AS_ONE_CLICK,
    });
  };

  const handleClickItem = (item: Item) => {
    setSelectedItem(item);
  };

  const handleClickPurchase = (totalPrice: number, amount: number) => {
    const newItems: Item[] = initialUser.items.map((i) =>
      i.name === selectedItem!.name
        ? { ...i, currentAmount: i.currentAmount + amount }
        : i
    )!;
    setInitialUser((prevState) => ({
      ...prevState,
      money: prevState.money - totalPrice,
      items: newItems,
    }));
  };

  const handleClickResetUser = () => {
    if (confirm('Reset All Data?')) {
      setInitialUser({ ...DEFAULT_USER_DATA, name: initialUser.name });
    }
  };

  const handleClickSaveUser = () => {
    saveUser(initialUser.name, initialUser);
    alert('Saved your data. Please put the same name when you login.');
    logout();
  };

  useEffect(() => {
    const setIntervalDaysCount = setInterval(() => {
      setInitialUser((prevState) => {
        const newDays = prevState.days + 1;
        const newAge = DEFAULT_USER_DATA.age + Math.floor(newDays / 365);
        return {
          ...prevState,
          days: newDays,
          age: newAge,
        };
      });
    }, 1000);

    return () => clearInterval(setIntervalDaysCount);
  }, []);

  return {
    initialUser,
    selectedItem,
    setSelectedItem,
    handleClickBurger,
    handleClickItem,
    handleClickPurchase,
    handleClickResetUser,
    handleClickSaveUser,
  };
};
