import { Dispatch, SetStateAction, useState } from "react";
import { useGetOwnLists } from "@/app/hooks/useGetOwnLists";
import { useCreateList } from "@/app/hooks/useCreateList";
import IconCheck from "@/app/assets/svg/icon-check";
import IconLoading from "@/app/assets/svg/icon-loading";

interface CreateListProps {
  displayPopover: Dispatch<SetStateAction<boolean>>;
  propData?: object | null;
}

export const CreateList = ({ displayPopover }: CreateListProps) => {
  const [listName, setListName] = useState<string>("");
  const { mutate, isPending } = useCreateList();
  const { refetch } = useGetOwnLists();

  const handleClick = () => {
    mutate(listName, {
      onSuccess: () => {
        refetch();
        displayPopover(false);
      },
    });
  };

  return (
    <div className="flex flex-col w-full h-full justify-between items-start">
      <div className="w-full">
        <p className="font-semibold text-base mb-2 text-darkText text-left">
          Criar nova lista
        </p>
        <input
          className="text-2xl w-full placeholder:text-neutral-400 text-darkText focus:outline-none focus:border-b-2 focus:border-darkBlue"
          placeholder="Nome da lista"
          type="text"
          onChange={(e) => setListName(e.target.value)}
        />
      </div>
      <button
        onClick={handleClick}
        className={`rounded-full w-16 h-16 self-end justify-center flex items-center ${
          isPending ? "bg-lightBlue" : "bg-darkBlue"
        }`}
      >
        {isPending ? (
          <IconLoading className="text-lightYellow animate-spin" />
        ) : (
          <IconCheck className="text-lightYellow w-9 h-9" />
        )}
      </button>
    </div>
  );
};
