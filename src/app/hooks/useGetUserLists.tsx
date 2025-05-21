import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";

const fetchUserLists = async (userId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/list/user/${userId}`,
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
  console.log(data);
  return data;
};

export const useGetUserLists = () => {
  const { token, user } = useAuth();
  return useQuery({
    queryKey: ["getUserLists", user?.uid],
    enabled: !!user?.uid && !!token,
    queryFn: async () => {
      if (!user?.uid || !token) {
        return [];
      }
      return await fetchUserLists(user.uid, token);
    },
  });
};
