/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext } from "react";
import { useGetListDetails } from "@/app/hooks/useGetListDetails";
import { QueryStatus } from "@tanstack/react-query";

const ListDetailsContext = createContext<{
  data: any | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  status: QueryStatus;
}>({
  data: null,
  isError: false,
  isLoading: false,
  refetch: () => {},
  status: "pending",
});

export const ListDetailsProvider = ({
  listId,
  children,
}: {
  listId?: string | undefined;
  children: React.ReactNode;
}) => {
  const { data, isLoading, isError, refetch, status } =
    useGetListDetails(listId);

  return (
    <ListDetailsContext.Provider
      value={{ data, isLoading, isError, refetch, status }}
    >
      {children}
    </ListDetailsContext.Provider>
  );
};

export const useListDetails = () => useContext(ListDetailsContext);
