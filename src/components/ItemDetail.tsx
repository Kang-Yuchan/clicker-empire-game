import { ChangeEvent, useMemo, useState } from 'react';
import { Item } from '../types';

type ItemDetailProps = {
  selectedItem: Item;
  resetSelectedItem: () => void;
  handleClickPurchase: (totalPrice: number, amount: number) => void;
};

export default function ItemDetail({
  selectedItem,
  resetSelectedItem,
  handleClickPurchase,
}: ItemDetailProps) {
  const [itemAmount, setItemAmount] = useState<number>(0);

  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setItemAmount(parseInt(amount));
  };

  const totalPrice = useMemo(
    () => itemAmount * selectedItem.price,
    [itemAmount]
  );

  return (
    <div className="p-2 m-1 text-white bg-[#3d5278]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 *:text-xl *:font-semibold">
          <h4>{selectedItem.name}</h4>
          <h4>Max purchases: {selectedItem.maxAmount}</h4>
          <h4>Price: ¥ {selectedItem.price}</h4>
          <h4>
            Get: ￥{selectedItem.perMoney} /{' '}
            {selectedItem.type === 'ability' ? ' click' : ' sec'}
          </h4>
        </div>
        <div className="block p-2 w-5/12">
          <img src={selectedItem.url} alt={selectedItem.name} />
        </div>
      </div>
      <p className="font-semibold mb-4">How many would you like to buy?</p>
      <input
        type="number"
        className="text-[#495057] text-base rounded-md h-9 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-300 mb-8 w-full"
        value={itemAmount}
        min={0}
        onChange={handleChangeAmount}
      />
      <p className="text-right mb-4">total: ￥ {totalPrice}</p>
      <div className="pb-4 flex justify-between">
        <button
          type="button"
          onClick={resetSelectedItem}
          className="rounded-md flex justify-center h-9 items-center w-5/12 text-blue-500 bg-white"
        >
          Go Back
        </button>
        <button
          type="button"
          onClick={() => {
            handleClickPurchase(totalPrice, itemAmount);
            resetSelectedItem();
          }}
          className="rounded-md flex justify-center h-9 items-center w-5/12 bg-blue-500"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
