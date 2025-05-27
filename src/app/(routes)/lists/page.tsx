"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGetOwnLists } from "@/app/hooks/useGetOwnLists";
import { useGetSharedLists } from "@/app/hooks/useGetSharedLists";
import { useJoinList } from "@/app/hooks/useJoinList";
import { List } from "@/app/types/list";
import { EmptyListDashboard } from "@/app/components/emptyListsDashboard";
import { ListCard } from "@/app/components/listCard";
import { Loading } from "@/app/components/loadingFullScreen";

export default function Lists() {
  const searchParams = useSearchParams();
  const shareToken = searchParams.get("share");
  const {
    data: ownLists,
    isLoading: loadingOwnLists,
    error: errorOwnLists,
  } = useGetOwnLists();

  const {
    data: sharedLists,
    isLoading: loadingSharedLists,
    refetch: refetchSharedLists,
    error: errorSharedLists,
  } = useGetSharedLists();

  const { mutate, isIdle, isPending } = useJoinList();

  useEffect(() => {
    if (shareToken) {
      mutate(shareToken, {
        onSuccess: () => {
          refetchSharedLists();
        },
      });
    }
  }, [mutate, refetchSharedLists, shareToken]);

  if (
    loadingSharedLists ||
    loadingOwnLists ||
    (shareToken && (isIdle || isPending))
  )
    return <Loading />;

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
