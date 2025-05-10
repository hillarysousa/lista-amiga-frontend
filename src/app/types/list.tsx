import { Item } from "./item";
import { User } from "./user";

export type List = {
  id: string;
  name: string;
  items: Item[];
  owner: User;
  participants: User[];
  shareToken: string | null;
  createdAt: Date;
  updateAt: Date;
};
