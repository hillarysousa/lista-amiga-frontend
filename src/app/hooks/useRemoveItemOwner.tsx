import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";

const patchRemoveItemOwner = async (
  itemId: string,
  userId: string,
  token: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/item/${itemId}/removeOwner/${userId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao remover dono do item");
  }

  return await response.json();
};

type RemoveItemOwner = {
  itemId: string;
  userId: string;
};

export const useRemoveItemOwner = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ itemId, userId }: RemoveItemOwner) => {
      if (!token) throw new Error("Token ausente.");
      return await patchRemoveItemOwner(itemId, userId, token);
    },
  });
};
