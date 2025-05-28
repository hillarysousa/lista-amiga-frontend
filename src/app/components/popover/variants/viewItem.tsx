/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { useSetItemOwner } from "@/app/hooks/useSetItemOwner";
import { useCheckItem } from "@/app/hooks/useCheckItem";
import { useRemoveItemOwner } from "@/app/hooks/useRemoveItemOwner";
import { getParticipantsFirstLetters } from "@/app/utils/users";
import { getRandomColor } from "@/app/utils/colors";
import { formattedDate } from "@/app/utils/date";
import { ParticipantsLetters } from "../../participantsLetters";
import { RadioCheck } from "../../RadioCheck";
import IconPlus from "@/app/assets/svg/icon-plus";
import IconMinus from "@/app/assets/svg/icon-minus";
import { useDeleteItem } from "@/app/hooks/useDeleteItem";
import IconTrash from "@/app/assets/svg/icon-trash";

interface ViewItemProps {
  displayPopover: Dispatch<SetStateAction<boolean>>;
  propData: any | null;
}

export const ViewItem = ({ propData, displayPopover }: ViewItemProps) => {
  const { mutate: mutateSetItemOwner } = useSetItemOwner();
  const { mutate: mutateCheckItem } = useCheckItem();
  const { mutate: mutateRemoveItemOwner } = useRemoveItemOwner();
  const { mutate: mutateDeleteItem } = useDeleteItem();
  const { user } = useAuth();
  const {
    assignedUser,
    name,
    checked,
    createdAt,
    itemId,
    refetchListDetails,
    listOwner,
  } = propData;
  const participantColor = getRandomColor();

  const handleAssignUser = () => {
    mutateSetItemOwner(itemId, {
      onSuccess: () => {
        refetchListDetails();
        displayPopover(false);
      },
    });
  };

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

  const handleUnassignUser = () => {
    mutateRemoveItemOwner(
      { itemId, userId: assignedUser.uid },
      {
        onSuccess: () => {
          refetchListDetails();
          displayPopover(false);
        },
      }
    );
  };

  const handleDeleteItem = () => {
    mutateDeleteItem(itemId, {
      onSuccess: () => {
        refetchListDetails();
        displayPopover(false);
      },
    });
  };

  const isOwnedOrAssignedByUser =
    assignedUser?.uid === user?.uid || listOwner.uid === user?.uid;

  return (
    <div className="flex flex-col w-full h-full justify-between items-start">
      <div>
        <div className="flex flex-row items-center mb-3">
          <a onClick={handleCheckItem}>
            <RadioCheck
              checked={checked}
              ownedByUser={assignedUser?.uid === user?.uid}
              bigger
            />
          </a>
          <h2 className="text-2xl text-darkText ml-2">{name}</h2>
        </div>
        <div className="ml-9">
          {assignedUser ? (
            <div className="text-darkText text-base flex flex-row justify-center">
              <div className="size-5 mr-1">
                <ParticipantsLetters
                  color={
                    assignedUser.uid === user?.uid
                      ? "var(--color-lightBlue)"
                      : `#${participantColor}`
                  }
                  letter={getParticipantsFirstLetters(assignedUser.name)}
                  label={assignedUser.name}
                />
              </div>
              {assignedUser.name}
              {isOwnedOrAssignedByUser && (
                <a
                  onClick={handleUnassignUser}
                  className="flex flex-row text-sm text-neutral-400 font-normal items-center ml-3 leading-[15px]"
                >
                  <div className="rounded-full bg-lightYellow w-4 h-4 justify-center items-center flex mr-1">
                    <IconMinus className="text-darkBlue" />
                  </div>
                  Remover
                </a>
              )}
            </div>
          ) : (
            <a
              onClick={handleAssignUser}
              className="flex flex-row text-base text-neutral-500 items-center"
            >
              <div className="rounded-full bg-lightYellow w-4 h-4 justify-center items-center flex mr-2">
                <IconPlus className="text-darkBlue w-2 h-2" />
              </div>
              Assumir item
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between w-full items-center">
        <p className="text-xs text-neutral-500">
          Adicionado {formattedDate(createdAt)}
        </p>
        {listOwner?.uid === user?.uid && (
          <a
            onClick={handleDeleteItem}
            className="rounded-full bg-lightYellow size-9 flex justify-center items-center"
          >
            <IconTrash className="text-darkBlue w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};
