export interface gameProps {
  id: string;
  name: string;
  categories: string[];
  image: string;
  currentSelection: string;
  jackpot?: number;
}

export interface navProps {
  titles: string[];
  selectFn?: any;
  selected?: string;
}
export interface jackpotProps {
  game: string;
  amount: number | undefined;
}
