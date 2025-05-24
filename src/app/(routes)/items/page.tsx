"use client";

import { EmptyItemDashboard } from "@/app/components/emptyItemsDashboard";
import { ItemCard } from "@/app/components/itemCard";
import { useGetUserItems } from "@/app/hooks/useGetUserItems";
import { useAuth } from "@/app/providers/AuthProvider";
import { Item } from "@/app/types/item";

export default function Items() {
  const { user } = useAuth();
  const {
    data: userItems,
    isLoading: loadingItems,
    error: errorItems,
  } = useGetUserItems();

  if (loadingItems || !user) return <div>Carregando...</div>;
  if (errorItems) return <div>Erro!</div>;

  return (
    <div className="w-full flex flex-col h-full relative">
      {userItems.length > 0 ? (
        <>
          {userItems.map((item: Item) => {
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
        </>
      ) : (
        <EmptyItemDashboard />
      )}
    </div>
  );
}
