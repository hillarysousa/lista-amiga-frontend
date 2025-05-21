import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";

const deleteList = async (listId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/list/${listId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao excluir lista");
  }

  const data = await response.json();
  return data;
};

export const useDeleteList = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (listId: string) => {
      if (!token) throw new Error("Token ausente.");
      return await deleteList(listId, token);
    },
  });
};
