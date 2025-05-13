import { useQuery } from "@tanstack/react-query";

const fetchUserLists = async (userId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/list/${userId}`,
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

export const useGetUserLists = (
  userId: string | undefined,
  token: string | null
) => {
  return useQuery({
    queryKey: ["getUserLists", userId],
    enabled: !!userId && !!token,
    queryFn: async () => {
      if (!userId || !token) {
        return [];
      }
      return await fetchUserLists(userId, token);
    },
  });
};
