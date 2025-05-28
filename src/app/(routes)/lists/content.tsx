"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetOwnLists } from "@/app/hooks/useGetOwnLists";
import { useGetSharedLists } from "@/app/hooks/useGetSharedLists";
import { useJoinList } from "@/app/hooks/useJoinList";
import { List } from "@/app/types/list";
import { EmptyListDashboard } from "@/app/components/emptyListsDashboard";
import { ListCard } from "@/app/components/listCard";
import { Loading } from "@/app/components/loadingFullScreen";

export function ListsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.delete("share");
          router.replace(`?${newParams.toString()}`, { scroll: false });
          refetchSharedLists();
        },
      });
    }
  }, [mutate, refetchSharedLists, router, searchParams, shareToken]);

  if (
    loadingSharedLists ||
    loadingOwnLists ||
    (shareToken && (isIdle || isPending))
  )
    return <Loading />;

  if (errorOwnLists || errorSharedLists) return <div>Erro!</div>;

  return (
    <div className="w-full flex flex-col h-full relative pb-10">
      {ownLists && ownLists.length > 0 ? (
        <>
          {ownLists.map((list: List) => (
            <ListCard
              key={list.id}
              listId={list.id}
              name={list.name}
              participants={list.participants}
              createdDate={list.createdAt}
              itemQuantity={list.items.length}
            />
          ))}
        </>
      ) : (
        <EmptyListDashboard />
      )}

      <h1 className="text-darkBlue text-3xl font-bold mb-6 mt-9">
        Listas compartilhadas
      </h1>

      {sharedLists && sharedLists.length > 0 ? (
        <div className="mb-9">
          {sharedLists.map((list: List) => (
            <ListCard
              key={list.id}
              listId={list.id}
              name={list.name}
              participants={list.participants}
              createdDate={list.createdAt}
              itemQuantity={list.items.length}
            />
          ))}
        </div>
      ) : (
        <div className="mb-10 flex flex-column w-full h-full flex-wrap">
          <EmptyListDashboard />
          <div className="h-14 block w-full" />
        </div>
      )}
    </div>
  );
}
