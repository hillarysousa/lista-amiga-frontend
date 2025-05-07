import { User } from "@/app/types/user";
import { ParticipantsLetters } from "../participantsLetters";

interface ListCardProps {
  name: string;
  participants: User[];
  createdDate: Date;
  itemQuantity: number;
}

export const ListCard = ({
  name,
  participants,
  createdDate,
  itemQuantity,
}: ListCardProps) => {
  const getParticipantsFirstLetters = (name: string) => {
    return name.slice(0, 1);
  };

  console.log(participants, "part >>>");
  return (
    <div className="bg-white rounded-xl flex w-full p-4 mb-4">
      <h3 className="text-darkText text-base font-bold mb-9">{name}</h3>
      {participants.map((user: User) => (
        <ParticipantsLetters
          letter={getParticipantsFirstLetters(user.name)}
          key={user.uid}
        />
      ))}
    </div>
  );
};
