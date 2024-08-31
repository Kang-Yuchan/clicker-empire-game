import { useEffect, useState } from 'react';
import { Item, User } from '../types';
import ItemCard from './ItemCard';
import ItemDetail from './ItemDetail';

type GameAppProps = {
  user: User;
};

const MONEY_AS_ONE_CLICK = 25;

export default function GameApp({ user }: GameAppProps) {
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
    console.log(newItems);
    setInitialUser((prevState) => ({
      ...prevState,
      money: prevState.money - totalPrice,
      items: newItems,
    }));
  };

  useEffect(() => {
    const setIntervalDaysCount = setInterval(() => {
      setInitialUser((prevState) => {
        const newDays = prevState.days + 1;
        const newAge = initialUser.age + Math.floor(newDays / 365);
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
    <div className="bg-[#3d5278] rounded-md p-2 flex md:w-10/12 w-full h-full">
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
          <div className="w-full flex gap-2">
            <div className="bg-[#3d5278] flex justify-center w-full h-10 items-center">
              {initialUser.name}
            </div>
            <div className="bg-[#3d5278] flex justify-center w-full h-10 items-center">
              {initialUser.age} years old
            </div>
          </div>
          <div className="w-full gap-2 flex">
            <div className="bg-[#3d5278] flex justify-center w-full h-10 items-center">
              {initialUser.days} days
            </div>
            <div className="bg-[#3d5278] flex justify-center w-full h-10 items-center">
              ¥ {initialUser.money}
            </div>
          </div>
        </div>
        <div className="mt-4 h-4/5 bg-[#343a40] overflow-y-auto p-2">
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
      </div>
    </div>
  );
}
