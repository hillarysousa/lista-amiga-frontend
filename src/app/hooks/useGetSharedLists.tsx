import { useQuery } from "@tanstack/react-query";

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

export const useGetSharedLists = (
  userId: string | undefined,
  token: string | null
) => {
  return useQuery({
    queryKey: ["getSharedLists", userId],
    enabled: !!userId && !!token,
    queryFn: async () => {
      if (!userId || !token) {
        return [];
      }
      return await fetchSharedLists(userId, token);
    },
  });
};
