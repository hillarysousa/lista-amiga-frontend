import { User } from "@/app/types/user";
import { ParticipantsLetters } from "../participantsLetters";
import Link from "next/link";
import { getRandomColor } from "@/app/utils/colors";
import { useAuth } from "@/app/providers/AuthProvider";
import { getParticipantsFirstLetters } from "@/app/utils/users";

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
  const { user } = useAuth();
  return (
    <Link href={`/lists/${listId}`}>
      <div
        aria-label={`Lista ${name}`}
        className="bg-white rounded-xl flex w-full p-4 mb-4 flex-col shadow-(--shadow-card)"
      >
        <h3 className="text-darkText text-base font-bold mb-9">{name}</h3>
        {participants && (
          <div aria-label="Participantes da lista" className="mb-9">
            {participants.map((participant: User) => {
              const participantColor = getRandomColor();
              return (
                <div className="size-8" key={participant.uid}>
                  <ParticipantsLetters
                    color={
                      participant.uid === user?.uid
                        ? "var(--color-lightBlue)"
                        : `#${participantColor}`
                    }
                    letter={getParticipantsFirstLetters(participant.name)}
                    label={participant.name}
                  />
                </div>
              );
            })}
            {participants.length > 4 && (
              <p
                aria-label={`mais ${participants.length - 4} participantes`}
                className="text-zinc-900 font-light"
              >
                + {participants.length - 4}
              </p>
            )}
          </div>
        )}
        <div className="flex w-full flex-row justify-between">
          <p aria-label="Data de criação" className="text-darkText text-xs">
            {formattedDate}
          </p>
          <p aria-label="Quantidade de itens" className="text-darkText text-xs">
            {itemQuantity < 2
              ? `${itemQuantity} item`
              : `${itemQuantity} itens`}
          </p>
        </div>
      </div>
    </Link>
  );
};
