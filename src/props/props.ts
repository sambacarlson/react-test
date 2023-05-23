export interface gameProps {
  id: string;
  name: string;
  categories: string[];
  image: string;
  currentSelection: string;
}

export interface navProps {
  titles: string[];
  selectFn?: any;
  selected?: string;
}