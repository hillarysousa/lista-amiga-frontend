"use client";
import { useAuth } from "@/app/providers/AuthProvider";
import { useGetUserLists } from "@/app/hooks/useGetUserLists";
import { List } from "@/app/types/list";
import { ListCard } from "@/app/components/listCard";
import Link from "next/link";

export default function Dashboard() {
  const { token, user } = useAuth();
  const { data, isLoading, error } = useGetUserLists(user?.uid, token!);

  if (!user || !token) {
    return <div>Carregando...</div>;
  }

  const unitedLists = (listData: List[]) => {
    return listData.flatMap((list: List) => list || []);
  };

  if (isLoading) return <div>Carregando as listas...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <div className="w-full flex flex-col">
      {unitedLists(data).map((list: List) => {
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
      <Link href="/lists" className="flex self-end-safe">
        <p className="text-darkBlue font-semibold uppercase text-base flex">
          Ver mais
        </p>
      </Link>
    </div>
  );
}
