import IconTrash from "@/app/assets/svg/icon-trash";
import { useDeleteList } from "@/app/hooks/useDeleteList";
import { useGetOwnLists } from "@/app/hooks/useGetOwnLists";
import { useGetSharedLists } from "@/app/hooks/useGetSharedLists";
import { useRouter } from "next/navigation";

interface DeleteListButtonProps {
  listId: string;
}

export const DeleteListButton = ({ listId }: DeleteListButtonProps) => {
  const { mutate } = useDeleteList();
  const { refetch: refetchSharedLists } = useGetSharedLists();
  const { refetch: refetchOwnLists } = useGetOwnLists();
  const router = useRouter();

  const handleClick = () => {
    mutate(listId, {
      onSuccess: () => {
        router.push("/lists");
        refetchSharedLists();
        refetchOwnLists();
      },
    });
  };
  return (
    <a
      onClick={handleClick}
      className="rounded-full bg-darkBlue size-9 flex justify-center items-center"
    >
      <IconTrash className="text-lightYellow" />
    </a>
  );
};
