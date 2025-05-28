"use client";

import { useGetUserItems } from "@/app/hooks/useGetUserItems";
import { useAuth } from "@/app/providers/AuthProvider";
import { Item } from "@/app/types/item";
import { EmptyItemDashboard } from "@/app/components/emptyItemsDashboard";
import { ItemCard } from "@/app/components/itemCard";
import { Loading } from "@/app/components/loadingFullScreen";

export default function Items() {
  const { user } = useAuth();
  const {
    data: userItems,
    isLoading: loadingItems,
    error: errorItems,
  } = useGetUserItems();

  if (loadingItems || !user) return <Loading />;
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
                listId={item.list.id}
                key={item.id}
                name={item.name}
                listName={item.list.name}
                assignedUser={item.owner}
                checked={item.checked}
                createdAt={item.createdAt}
                isItemPage
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
