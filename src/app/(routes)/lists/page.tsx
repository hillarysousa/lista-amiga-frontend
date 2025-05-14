"use client";
import { EmptyListDashboard } from "@/app/components/emptyListsDashboard";
import { ListCard } from "@/app/components/listCard";
import { useGetOwnLists } from "@/app/hooks/useGetOwnLists";
import { useGetSharedLists } from "@/app/hooks/useGetSharedLists";
import { List } from "@/app/types/list";

export default function Lists() {
  const {
    data: ownLists,
    isLoading: loadingOwnLists,
    error: errorOwnLists,
  } = useGetOwnLists();

  const {
    data: sharedLists,
    isLoading: loadingSharedLists,
    error: errorSharedLists,
  } = useGetSharedLists();
  if (loadingSharedLists || loadingOwnLists)
    return <div>Carregando as listas...</div>;
  if (errorOwnLists || errorSharedLists) return <div>Erro!</div>;

  return (
    <div className="w-full flex flex-col h-full relative">
      {ownLists && ownLists.length > 0 ? (
        <>
          {ownLists.map((list: List) => {
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
        </>
      ) : (
        <EmptyListDashboard />
      )}

      <h1 className="text-darkBlue text-3xl font-bold mb-6 mt-9">
        Listas compartilhadas
      </h1>
      {sharedLists && sharedLists.length > 0 ? (
        <>
          {sharedLists.map((list: List) => {
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
        </>
      ) : (
        <EmptyListDashboard />
      )}
    </div>
  );
}
