export type User = {
  name: string;
  age: number;
  clickCount: number;
  days: number;
  incomePerClick: number;
  incomePerSec: number;
  items: Item[];
  money: number;
  stock: number;
};

export type Item = {
  name: string;
  currentAmount: number;
  maxAmount: number;
  perMoney: number;
  perRate: number;
  price: number;
  type: ItemType;
  url: string;
};

export type ItemType = 'ability' | 'realState' | 'investment';
