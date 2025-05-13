import { List } from "./list";
import { User } from "./user";

export type Item = {
  id: string;
  name: string;
  checked: boolean;
  list: List;
  owner: User | null;
  createdAt: Date;
  updateAt: Date;
};
