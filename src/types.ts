export type User = {
	name: string;
	age: number;
	clickCount: number; 
	days: number;
	incomePerClick: number;
	incomePerSec: number;
	items: Item[]
	money: number;
	stock: number;
}

export type Item = {
	currentAmount: 0maxAmount: 500name: "Flip machine"perMoney: 25perRate: 0price: 15000type: "ability"url: "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"
}