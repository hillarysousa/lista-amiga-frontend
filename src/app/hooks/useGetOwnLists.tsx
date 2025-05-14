import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";

const fetchOwnLists = async (userId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/list/own/${userId}`,
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

export const useGetOwnLists = () => {
  const { token, user } = useAuth();
  return useQuery({
    queryKey: ["getOwnLists", user?.uid],
    enabled: !!user?.uid && !!token,
    queryFn: async () => {
      if (!user || !token) {
        return [];
      }
      return await fetchOwnLists(user.uid, token);
    },
  });
};
