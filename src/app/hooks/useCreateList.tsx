import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";

const postCreateList = async (listName: string, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/list`, {
    method: "POST",
    body: JSON.stringify({ name: listName }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao criar lista");
  }

  return await response.json();
};

export const useCreateList = () => {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (listName: string) => {
      if (!token) throw new Error("Token ausente.");
      return await postCreateList(listName, token);
    },
  });
};
