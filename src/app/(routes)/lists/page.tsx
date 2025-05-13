"use client";
import { useRef } from "react";
import { EmptyListDashboard } from "@/app/components/emptyListsDashboard";
import { ListCard } from "@/app/components/listCard";
import { Popover, PopoverHandle } from "@/app/components/popover";
import { useGetOwnLists } from "@/app/hooks/useGetOwnLists";
import { useGetSharedLists } from "@/app/hooks/useGetSharedLists";
import { useAuth } from "@/app/providers/AuthProvider";
import { List } from "@/app/types/list";

export default function Lists() {
  const popoverRef = useRef<PopoverHandle>(null);
  const { token, user } = useAuth();
  const {
    data: ownLists,
    isLoading: loadingOwnLists,
    error: errorOwnLists,
  } = useGetOwnLists(user?.uid, token!);

  const {
    data: sharedLists,
    isLoading: loadingSharedLists,
    error: errorSharedLists,
  } = useGetSharedLists(user?.uid, token!);

  if (!user || !token) {
    return <div>Carregando...</div>;
  }
  if (loadingSharedLists || loadingOwnLists)
    return <div>Carregando as listas...</div>;
  if (errorOwnLists || errorSharedLists) return <div>Erro!</div>;

  return (
    <div className="w-full flex flex-col">
      <button
        onClick={() => popoverRef.current?.open()}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Abrir Popover
      </button>

      <Popover ref={popoverRef} popoverRef={popoverRef}>
        <p className="mb-4">Conteúdo do Popover</p>
      </Popover>
      {ownLists.length > 0 ? (
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

      <h1 className="text-darkBlue text-3xl font-bold mb-6">
        Listas compartilhadas
      </h1>
      {sharedLists.length > 0 ? (
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
