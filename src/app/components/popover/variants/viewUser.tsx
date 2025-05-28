import { Dispatch, SetStateAction } from "react";
import { ParticipantsLetters } from "../../participantsLetters";
import { getParticipantsFirstLetters } from "@/app/utils/users";

import IconMinus from "@/app/assets/svg/icon-minus";
import { useRemoveParticipant } from "@/app/hooks/useRemoveParticipant";

interface ViewUserProps {
  displayPopover: Dispatch<SetStateAction<boolean>>;
  propData: any | null;
}

export const ViewUser = ({ displayPopover, propData }: ViewUserProps) => {
  const { mutate } = useRemoveParticipant();
  const { participantColor, participant, listId, refetchListDetails } =
    propData;

  const handleClick = () => {
    mutate(
      { listId, userId: participant.uid },
      {
        onSuccess: () => {
          refetchListDetails();
          displayPopover(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-full h-full items-start">
      <div className="flex flex-row items-center mb-3">
        <div className="size-7 mr-1">
          <ParticipantsLetters
            color={`#${participantColor}`}
            letter={getParticipantsFirstLetters(participant.name)}
            label={participant.name}
          />
        </div>
        <h2 className="text-xl text-darkText ml-2">{participant.name}</h2>
      </div>
      <div className="ml-9">
        <a
          onClick={handleClick}
          className="flex flex-row text-base text-neutral-500 items-center"
        >
          <div className="rounded-full bg-lightYellow w-4 h-4 justify-center items-center flex mr-2">
            <IconMinus className="text-darkBlue" />
          </div>
          Remover da lista
        </a>
      </div>
    </div>
  );
};
