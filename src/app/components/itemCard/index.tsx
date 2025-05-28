import { User } from "@/app/types/user";
import { ParticipantsLetters } from "../participantsLetters";
import { RadioCheck } from "../RadioCheck";
import { getParticipantsFirstLetters } from "@/app/utils/users";
import { useRef } from "react";
import { Popover, PopoverHandle } from "../popover";
import { PopoverTypes } from "@/app/utils/popoverTypes";
import { useAuth } from "@/app/providers/AuthProvider";
import { getRandomColor } from "@/app/utils/colors";

interface ItemCardProps {
  userId: string;
  itemId: string;
  listId?: string;
  name: string;
  listName?: string;
  assignedUser: User | null;
  checked: boolean;
  createdAt?: Date;
  listOwner?: User;
  refetchListDetails?: () => void;
  isItemPage?: boolean;
}

export const ItemCard = ({
  userId,
  itemId,
  listId,
  name,
  listName,
  assignedUser,
  checked,
  createdAt,
  listOwner,
  refetchListDetails,
  isItemPage = false,
}: ItemCardProps) => {
  const popoverRef = useRef<PopoverHandle>(null);
  const { user } = useAuth();
  const participantColor = getRandomColor();
  return (
    <>
      <a
        onClick={() =>
          popoverRef.current?.open({
            assignedUser,
            name,
            checked,
            createdAt,
            itemId,
            refetchListDetails,
            listOwner,
            listName,
            listId,
          })
        }
      >
        <div
          aria-label={`Item ${name}`}
          className="bg-white rounded-xl flex w-full p-4 mb-3 flex-row shadow-(--shadow-card) justify-between"
        >
          <div className="flex flex-row">
            <RadioCheck
              checked={checked}
              ownedByUser={assignedUser?.uid === userId}
            />
            <div className="flex flex-col ml-2">
              <h4
                aria-label="Nome do item"
                className={`text-darkText text-base leading-[21px] font-normal`}
              >
                {name}
              </h4>
              {listName && (
                <p className="text-darkText text-xs mt-3">{listName}</p>
              )}
            </div>
          </div>
          {assignedUser?.uid && (
            <div className="size-6 relative">
              <ParticipantsLetters
                color={
                  assignedUser.uid === user?.uid
                    ? "var(--color-lightBlue)"
                    : `#${participantColor}`
                }
                letter={getParticipantsFirstLetters(assignedUser?.name)}
                label={name}
              />
            </div>
          )}
        </div>
      </a>
      <Popover
        ref={popoverRef}
        variant={
          isItemPage ? PopoverTypes.VIEW_ITEM_LIST : PopoverTypes.VIEW_ITEM
        }
      />
    </>
  );
};
