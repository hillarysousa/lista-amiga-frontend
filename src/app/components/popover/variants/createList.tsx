import { Dispatch, SetStateAction, useState } from "react";
import { useCreateList } from "@/app/hooks/useCreateList";
import IconCheck from "@/app/assets/svg/icon-check";
import IconLoading from "@/app/assets/svg/icon-loading";

interface CreateListProps {
  displayPopover: Dispatch<SetStateAction<boolean>>;
}

export const CreateList = ({ displayPopover }: CreateListProps) => {
  const [listName, setListName] = useState<string>("");
  const { mutate, isPending } = useCreateList();

  const handleClick = () => {
    mutate(listName, {
      onSuccess: () => {
        displayPopover(false);
      },
    });
  };

  console.log(isPending, "isPending >>>>");
  return (
    <div className="flex flex-col w-full h-full justify-between items-start">
      <div>
        <p className="font-semibold text-base mb-2 text-darkText text-left">
          Criar nova lista
        </p>
        <input
          className="text-2xl placeholder:text-neutral-400 text-darkText"
          placeholder="Nome da lista"
          type="text"
          onChange={(e) => setListName(e.target.value)}
        ></input>
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
