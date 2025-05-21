import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";

const fetchUserItems = async (userId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/item/own/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Falha ao carregar os itens do usuário");
  }
  const data = await response.json();
  return data;
};

export const useGetUserItems = () => {
  const { token, user } = useAuth();
  return useQuery({
    queryKey: ["getUserItems", user?.uid],
    enabled: !!user?.uid || !!token,
    queryFn: async () => {
      if (!user?.uid || !token) {
        return [];
      }
      return await fetchUserItems(user.uid, token);
    },
  });
};
