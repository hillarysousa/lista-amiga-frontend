import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";

const fetchSharedLists = async (userId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/list/shared/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao carregar as listas");
  }
  const data = await response.json();
  return data;
};

export const useGetSharedLists = () => {
  const { user, token } = useAuth();
  return useQuery({
    queryKey: ["getSharedLists", user?.uid],
    enabled: !!user?.uid && !!token,
    staleTime: Infinity,
    queryFn: async () => {
      if (!user || !token) {
        return [];
      }
      return await fetchSharedLists(user.uid, token);
    },
  });
};
