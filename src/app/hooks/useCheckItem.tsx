import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";

const patchCheckItem = async (itemId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/item/${itemId}/check`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao marcar item como concluído");
  }

  return await response.json();
};

export const useCheckItem = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (itemId: string) => {
      if (!token) throw new Error("Token ausente.");
      return await patchCheckItem(itemId, token);
    },
  });
};
