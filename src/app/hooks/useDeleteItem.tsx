import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";

const deleteItem = async (itemId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/item/${itemId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao excluir item");
  }

  const data = await response.json();
  return data;
};

export const useDeleteItem = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (itemId: string) => {
      if (!token) throw new Error("Token ausente.");
      return await deleteItem(itemId, token);
    },
  });
};
