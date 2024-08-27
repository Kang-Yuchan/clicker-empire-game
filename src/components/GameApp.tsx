import { useCallback, useState } from 'react';
import { User } from '../types';

type GameAppProps = {
  user: User;
};

export default function GameApp({ user }: GameAppProps) {
  const [initialUser, setInitialUser] = useState<User>(user);

  const handleClickBurger = useCallback(() => {
    setInitialUser({
      ...initialUser,
      clickCount: initialUser.clickCount + 1,
    });
  }, [initialUser.clickCount]);

  return (
    <div className="bg-[#3d5278] rounded-md p-2">
      <div className="bg-[#343a40] p-2 w-1/3">
        <div className="bg-[#3d5278] flex flex-col justify-center text-white">
          <span className="flex text-xl font-medium w-full justify-center items-center">
            {initialUser.clickCount} Burgers
          </span>
          <div className="flex justify-center">one click ￥25</div>
        </div>
        <button
          type="button"
          onClick={handleClickBurger}
          className="pt-12 p-2 flex justify-center transition hover:opacity-80"
        >
          <img
            src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png"
            className="py-2"
          />
        </button>
      </div>
      <div></div>
    </div>
  );
}
