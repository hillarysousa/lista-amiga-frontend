import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";

const postShareList = async (listId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/list/${listId}/share`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao compartilhar lista");
  }

  const data = await response.json();
  console.log("RESPONSE JSON >>>", data);
  return data;
};

export const useShareList = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (listId: string) => {
      if (!token) throw new Error("Token ausente.");
      return await postShareList(listId, token);
    },
  });
};
