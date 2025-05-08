import { getRandomColor } from "@/app/utils/colors";

interface ParticipantsLettersProps {
  letter: string;
}

export const ParticipantsLetters = ({ letter }: ParticipantsLettersProps) => {
  const color = `#${getRandomColor()}`;
  return (
    <div
      className={`bg-${[
        getRandomColor(),
      ]} p-4 text-white font-bold rounded-full flex w-[30px] h-[30px] justify-center items-center mr-1`}
      style={{ backgroundColor: color }}
    >
      {letter}
    </div>
  );
};
