import { Item } from '../types';

type ItemCardProps = {
  item: Item;
  handleClickItem: (item: Item) => void;
};

export default function ItemCard({ item, handleClickItem }: ItemCardProps) {
  return (
    <div
      key={item.name}
      className="bg-[#3d5278] mt-1 first:mt-0 p-2 flex cursor-pointer hover:border-2 hover: border-blue-500 *:text-white"
      onClick={() => handleClickItem(item)}
    >
      <div className="block p-1 w-1/4">
        <img src={item.url} alt={item.name} />
      </div>
      <div className="flex flex-col w-full px-4 justify-center gap-2 *:font-semibold">
        <div className="flex justify-between *:text-2xl">
          <h4>{item.name}</h4>
          <h4>{item.currentAmount}</h4>
        </div>
        <div className="flex justify-between *:text-base">
          <p>￥{item.price}</p>
          <p className="text-green-600">
            ￥{item.perMoney} /{item.type === 'ability' ? ' click' : ' sec'}
          </p>
        </div>
      </div>
    </div>
  );
}
