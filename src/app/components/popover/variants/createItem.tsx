import { Dispatch, SetStateAction, useState } from "react";
import { useCreateItem } from "@/app/hooks/useCreateItem";
import IconCheck from "@/app/assets/svg/icon-check";
import IconLoading from "@/app/assets/svg/icon-loading";
import { useListDetails } from "@/app/providers/ListDetailsProvider";

interface CreateItemProps {
  displayPopover: Dispatch<SetStateAction<boolean>>;
}

export const CreateItem = ({ displayPopover }: CreateItemProps) => {
  const [itemName, setItemName] = useState<string>("");
  const { mutate, isPending } = useCreateItem();
  const { refetch, data } = useListDetails();

  const handleClick = () => {
    mutate(
      { itemName, listId: data.id },
      {
        onSuccess: () => {
          displayPopover(false);
          refetch();
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-full h-full justify-between items-start">
      <div>
        <p className="font-semibold text-base mb-2 text-darkText text-left">
          Criar novo item
        </p>
        <div className="flex flex-row items-center">
          <div className="rounded-full border-2 border-borderEnabled w-6 h-6 mr-2" />
          <input
            className="text-2xl placeholder:text-neutral-400 text-darkText"
            placeholder="Nome do item"
            type="text"
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
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
