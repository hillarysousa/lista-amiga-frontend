/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext } from "react";
import { useGetListDetails } from "@/app/hooks/useGetListDetails";

const ListDetailsContext = createContext<{
  data: any | null;
  isLoading: boolean;
  isError: boolean;
}>({
  data: null,
  isError: false,
  isLoading: false,
});

export const ListDetailsProvider = ({
  listId,
  children,
}: {
  listId?: string | undefined;
  children: React.ReactNode;
}) => {
  const { data, isLoading, isError } = useGetListDetails(listId);

  return (
    <ListDetailsContext.Provider value={{ data, isLoading, isError }}>
      {children}
    </ListDetailsContext.Provider>
  );
};

export const useListDetails = () => useContext(ListDetailsContext);
