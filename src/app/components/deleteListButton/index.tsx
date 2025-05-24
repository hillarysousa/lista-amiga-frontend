import IconTrash from "@/app/assets/svg/icon-trash";
import { useDeleteList } from "@/app/hooks/useDeleteList";
import { useRouter } from "next/navigation";

interface DeleteListButtonProps {
  listId: string;
}

export const DeleteListButton = ({ listId }: DeleteListButtonProps) => {
  const { mutate } = useDeleteList();
  const router = useRouter();

  const handleClick = () => {
    mutate(listId, {
      onSuccess: () => {
        router.push("/lists");
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
