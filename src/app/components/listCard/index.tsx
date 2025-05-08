import { User } from "@/app/types/user";
import { ParticipantsLetters } from "../participantsLetters";
import Link from "next/link";

interface ListCardProps {
  listId: string;
  name: string;
  participants: User[];
  createdDate: Date;
  itemQuantity: number;
}

export const ListCard = ({
  listId,
  name,
  participants,
  createdDate,
  itemQuantity,
}: ListCardProps) => {
  const formattedDate = new Date(createdDate).toLocaleDateString("pt-BR");
  const getParticipantsFirstLetters = (name: string) => {
    return name.slice(0, 1);
  };
  return (
    <Link href={`/lists/${listId}`}>
      <div className="bg-white rounded-xl flex w-full p-4 mb-4 flex-col shadow-(--shadow-card)">
        <h3 className="text-darkText text-base font-bold mb-9">{name}</h3>
        {participants && (
          <div className="mb-9">
            {participants.map((user: User) => (
              <ParticipantsLetters
                letter={getParticipantsFirstLetters(user.name)}
                key={user.uid}
              />
            ))}
            {participants.length > 4 && (
              <p className="text-zinc-900 font-light">
                + {participants.length - 4}
              </p>
            )}
          </div>
        )}
        <div className="flex w-full flex-row justify-between">
          <p className="text-darkText text-xs">{formattedDate}</p>
          <p className="text-darkText text-xs">
            {itemQuantity < 2
              ? `${itemQuantity} item`
              : `${itemQuantity} itens`}
          </p>
        </div>
      </div>
    </Link>
  );
};
