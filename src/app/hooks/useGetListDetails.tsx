import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";

const fetchListDetails = async (listId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/list/${listId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao carregar os detalhes da lista");
  }
  const data = await response.json();

  return data;
};

export const useGetListDetails = (listId: string | undefined) => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["getlistDetails", listId],
    enabled: !!listId && !!token,
    queryFn: async () => {
      if (!listId || !token) {
        return {};
      }
      return await fetchListDetails(listId, token);
    },
  });
};
