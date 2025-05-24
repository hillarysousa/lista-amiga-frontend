import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";

const patchRemoveParticipant = async (
  listId: string,
  token: string,
  userId: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/list/${listId}/kick/${userId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao remover participante");
  }

  return await response.json();
};

type RemoveParticipantArgs = {
  listId: string;
  userId: string;
};

export const useRemoveParticipant = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async ({ listId, userId }: RemoveParticipantArgs) => {
      if (!token) throw new Error("Token ausente.");
      return await patchRemoveParticipant(listId, token, userId);
    },
  });
};
