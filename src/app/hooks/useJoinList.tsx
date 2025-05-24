import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";

const postJoinList = async (shareToken: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/list/join/${shareToken}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao ser adicionado à lista");
  }
  const data = await response.json();
  return data;
};

export const useJoinList = () => {
  const { token } = useAuth();
  return useMutation({
    mutationKey: ["postJoinList"],
    mutationFn: async (shareToken: string) => {
      if (!token) throw new Error("Token ausente.");
      return await postJoinList(shareToken, token);
    },
  });
};
