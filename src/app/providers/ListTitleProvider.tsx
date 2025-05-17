"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useGetListDetails } from "@/app/hooks/useGetListDetails";

const ListTitleContext = createContext<{
  title: string;
}>({
  title: "",
});

export const ListTitleProvider = ({
  listId,
  children,
}: {
  listId?: string | undefined;
  children: React.ReactNode;
}) => {
  const [title, setTitle] = useState("");
  const { data, isLoading } = useGetListDetails(listId);

  useEffect(() => {
    if (!isLoading && data) {
      setTitle(data.name);
    }
  }, [isLoading, data]);

  return (
    <ListTitleContext.Provider value={{ title }}>
      {children}
    </ListTitleContext.Provider>
  );
};

export const useListTitle = () => useContext(ListTitleContext);
