import { getRandomColor } from "@/app/utils/colors";

interface ParticipantsLettersProps {
  letter: string;
}

export const ParticipantsLetters = ({ letter }: ParticipantsLettersProps) => {
  console.log(letter, "letter >>>>");
  return (
    <div className={`bg-${[getRandomColor()]} p-4 text-white`}>{letter}</div>
  );
};
