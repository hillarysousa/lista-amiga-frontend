"use client";
import { useAuth } from "@/app/providers/AuthProvider";
import { useGetUserLists } from "@/app/hooks/useGetUserLists";
import { useGetUserItems } from "@/app/hooks/useGetUserItems";
import { List } from "@/app/types/list";
import { ListCard } from "@/app/components/listCard";
import Link from "next/link";
import { Item } from "@/app/types/item";
import { ItemCard } from "@/app/components/itemCard";

export default function Dashboard() {
  const { token, user } = useAuth();
  const {
    data: userLists,
    isLoading: loadingLists,
    error: errorLists,
  } = useGetUserLists(user?.uid, token!);

  const {
    data: userItems,
    isLoading: loadingItems,
    error: errorItems,
  } = useGetUserItems(user?.uid, token!);

  if (!user || !token) {
    return <div>Carregando...</div>;
  }

  const unitedLists = (listData: List[]) => {
    return listData.flatMap((list: List) => list || []).slice(0, 2);
  };

  if (loadingLists || loadingItems) return <div>Carregando as listas...</div>;
  if (errorLists || errorItems) return <div>Erro!</div>;

  return (
    <div className="w-full flex flex-col">
      {unitedLists(userLists).map((list: List) => {
        return (
          <ListCard
            key={list.id}
            listId={list.id}
            name={list.name}
            participants={list.participants}
            createdDate={list.createdAt}
            itemQuantity={list.items.length}
          />
        );
      })}
      <Link href="/lists" className="flex self-end-safe mb-9">
        <p className="text-darkBlue font-semibold uppercase text-base flex">
          Ver mais
        </p>
      </Link>

      <h1 className="text-darkBlue text-3xl font-bold mb-6">Itens</h1>
      {userItems.slice(0, 6).map((item: Item) => {
        return (
          <ItemCard
            userId={user.uid}
            key={item.id}
            itemId={item.id}
            name={item.name}
            listName={item.list.name}
            assignedUser={item.owner}
            checked={item.checked}
          />
        );
      })}
      <Link href="/items" className="flex self-end-safe mb-9">
        <p className="text-darkBlue font-semibold uppercase text-base flex">
          Ver mais
        </p>
      </Link>
    </div>
  );
}
