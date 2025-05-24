import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";

const postSetItemOwner = async (itemId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/item/${itemId}/setOwner`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao mudar dono do item");
  }

  return await response.json();
};

export const useSetItemOwner = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (itemId: string) => {
      if (!token) throw new Error("Token ausente.");
      return await postSetItemOwner(itemId, token);
    },
  });
};
