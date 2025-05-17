import { User } from "@/app/types/user";
import { ParticipantsLetters } from "../participantsLetters";
import Link from "next/link";
import { RadioCheck } from "../RadioCheck";
import { getParticipantsFirstLetters } from "@/app/utils/users";

interface ItemCardProps {
  userId: string;
  itemId: string;
  name: string;
  listName: string;
  assignedUser: User | null;
  checked: boolean;
}

export const ItemCard = ({
  userId,
  itemId,
  name,
  listName,
  assignedUser,
  checked,
}: ItemCardProps) => {
  return (
    <Link href={`/items/${itemId}`}>
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
              className="text-darkText text-base leading-[21px] mb-3 font-normal"
            >
              {name}
            </h4>
            <p className="text-darkText text-xs">{listName}</p>
          </div>
        </div>
        {assignedUser?.uid && (
          <div className="size-6 relative">
            <ParticipantsLetters
              color="var(--color-lightBlue)"
              letter={getParticipantsFirstLetters(assignedUser?.name)}
              label={name}
            />
          </div>
        )}
      </div>
    </Link>
  );
};
