import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";

const postCreateItem = async (
  itemName: string,
  listId: string,
  token: string
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item`, {
    method: "POST",
    body: JSON.stringify({ name: itemName, listId }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao criar item");
  }

  return await response.json();
};

type CreateItem = {
  itemName: string;
  listId: string;
};

export const useCreateItem = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ itemName, listId }: CreateItem) => {
      if (!token) throw new Error("Token ausente.");
      return await postCreateItem(itemName, listId, token);
    },
  });
};
