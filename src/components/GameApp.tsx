import { useEffect, useState } from 'react';
import { Item, User } from '../types';
import ItemCard from './ItemCard';
import ItemDetail from './ItemDetail';
import { FaSave, FaUndo } from 'react-icons/fa';
import { DEFAULT_USER_DATA } from '../lib/constants';
import { saveUser } from '../lib/user';

type GameAppProps = {
  user: User;
  logout: () => void;
};

const MONEY_AS_ONE_CLICK = 25;

export default function GameApp({ user, logout }: GameAppProps) {
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

  return (
    <div className="bg-[#3d5278] rounded-md p-2 flex md:w-10/12 w-full h-full relative">
      <div className="bg-[#343a40] p-2 w-1/3">
        <div className="bg-[#3d5278] flex flex-col justify-center text-white">
          <span className="flex text-xl font-medium w-full justify-center items-center">
            {initialUser.clickCount} Burgers
          </span>
          <div className="flex justify-center">
            one click ￥{MONEY_AS_ONE_CLICK}
          </div>
        </div>
        <button
          type="button"
          className="pt-12 p-2 flex justify-center cursor-default"
        >
          <img
            src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png"
            className="py-2 transition hover:opacity-80 cursor-pointer"
            onClick={handleClickBurger}
          />
        </button>
      </div>
      <div className="w-2/3 relative px-4">
        <div className="flex flex-wrap p-1 gap-2 bg-[#343a40] *:text-white *:font-semibold">
          <div className="w-full flex flex-col gap-2 md:flex-row">
            <div className="bg-[#3d5278] flex justify-center w-full h-10 items-center">
              {initialUser.name}
            </div>
            <div className="bg-[#3d5278] flex justify-center w-full h-10 items-center">
              {initialUser.age} years old
            </div>
          </div>
          <div className="w-full flex gap-2 flex-col md:flex-row">
            <div className="bg-[#3d5278] flex justify-center w-full h-10 items-center">
              {initialUser.days} days
            </div>
            <div className="bg-[#3d5278] flex justify-center w-full h-10 items-center">
              ¥ {initialUser.money}
            </div>
          </div>
        </div>
        <div className="mt-4 h-3/5 md:h-4/5 bg-[#343a40] overflow-y-auto p-2">
          {selectedItem ? (
            <ItemDetail
              selectedItem={selectedItem}
              resetSelectedItem={() => setSelectedItem(null)}
              handleClickPurchase={handleClickPurchase}
            />
          ) : (
            initialUser.items.map((item) => (
              <ItemCard
                key={item.name}
                item={item}
                handleClickItem={handleClickItem}
              />
            ))
          )}
        </div>
        <div className="md:absolute flex justify-end mt-6 md:mt-0 gap-2 -bottom-4 right-6">
          <button
            type="button"
            className="border border-white p-2 transition hover:opacity-80"
            onClick={handleClickResetUser}
          >
            <FaUndo className="text-white text-4xl" />
          </button>
          <button
            type="button"
            className="border border-white p-2 transition hover:opacity-80"
            onClick={handleClickSaveUser}
          >
            <FaSave className="text-white text-4xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
