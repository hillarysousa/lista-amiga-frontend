/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { useCheckItem } from "@/app/hooks/useCheckItem";
import { formattedDate } from "@/app/utils/date";
import { RadioCheck } from "../../RadioCheck";
import IconArrow from "@/app/assets/svg/icon-arrow";
import Link from "next/link";

interface ViewItemListProps {
  displayPopover: Dispatch<SetStateAction<boolean>>;
  propData: any | null;
}

export const ViewItemList = ({
  propData,
  displayPopover,
}: ViewItemListProps) => {
  const { mutate: mutateCheckItem } = useCheckItem();
  const { user } = useAuth();
  const {
    assignedUser,
    name,
    checked,
    createdAt,
    itemId,
    refetchListDetails,
    listName,
    listId,
  } = propData;

  const handleCheckItem = () => {
    if (assignedUser?.uid === user?.uid) {
      return mutateCheckItem(itemId, {
        onSuccess: () => {
          refetchListDetails();
          displayPopover(false);
        },
      });
    }
    return;
  };

  return (
    <div className="flex flex-col w-full h-full justify-between items-start">
      <div>
        <div className="flex flex-row items-center mb-2">
          <a onClick={handleCheckItem}>
            <RadioCheck
              checked={checked}
              ownedByUser={assignedUser?.uid === user?.uid}
              bigger
            />
          </a>
          <h2 className="text-2xl text-darkText ml-2">{name}</h2>
        </div>
        <div className="ml-8">
          <div className="text-darkText text-base flex flex-row justify-center">
            {listName}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full items-center">
        <p className="text-xs text-neutral-500">
          Adicionado {formattedDate(createdAt)}
        </p>
        <Link
          aria-label="Itens"
          href={`/lists/${listId}`}
          className="rounded-full w-16 h-16 self-end justify-center flex items-center bg-darkBlue"
        >
          <IconArrow className="text-lightYellow w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};
