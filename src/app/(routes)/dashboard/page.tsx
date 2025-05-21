"use client";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import { useGetUserLists } from "@/app/hooks/useGetUserLists";
import { useGetUserItems } from "@/app/hooks/useGetUserItems";
import { List } from "@/app/types/list";
import { Item } from "@/app/types/item";
import { ListCard } from "@/app/components/listCard";
import { ItemCard } from "@/app/components/itemCard";
import { EmptyListDashboard } from "@/app/components/emptyListsDashboard";
import { EmptyItemDashboard } from "@/app/components/emptyItemsDashboard";

export default function Dashboard() {
  const { token, user } = useAuth();
  const {
    data: userLists,
    isLoading: loadingLists,
    error: errorLists,
  } = useGetUserLists();

  const {
    data: userItems,
    isLoading: loadingItems,
    error: errorItems,
  } = useGetUserItems();

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
      {unitedLists(userLists).length > 0 ? (
        <>
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
        </>
      ) : (
        <EmptyListDashboard />
      )}

      <h1 className="text-darkBlue text-3xl font-bold mb-6">Itens</h1>
      {userItems.length > 0 ? (
        <>
          {userItems.slice(0, 6).map((item: Item) => {
            return (
              <ItemCard
                userId={user.uid}
                itemId={item.id}
                key={item.id}
                name={item.name}
                listName={item.list.name}
                assignedUser={item.owner}
                checked={item.checked}
                createdAt={item.createdAt}
              />
            );
          })}
          <Link href="/items" className="flex self-end-safe mb-9">
            <p className="text-darkBlue font-semibold uppercase text-base flex">
              Ver mais
            </p>
          </Link>
        </>
      ) : (
        <EmptyItemDashboard />
      )}
    </div>
  );
}
