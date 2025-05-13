import { useQuery } from "@tanstack/react-query";

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

export const useGetUserItems = (
  userId: string | undefined,
  token: string | null
) => {
  return useQuery({
    queryKey: ["getUserItems"],
    enabled: !!userId || !!token,
    queryFn: async () => {
      if (!userId || !token) {
        return [];
      }
      return await fetchUserItems(userId, token);
    },
  });
};
