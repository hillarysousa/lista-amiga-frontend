import { Item } from "./item";
import { List } from "./list";

export type User = {
  uid: string;
  name: string;
  lists: List[];
  sharedLists: List[];
  items: Item[];
};
