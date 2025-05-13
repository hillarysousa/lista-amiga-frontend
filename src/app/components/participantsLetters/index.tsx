interface ParticipantsLettersProps {
  letter: string;
  label: string;
  color: string;
}

export const ParticipantsLetters = ({
  letter,
  label,
  color,
}: ParticipantsLettersProps) => {
  return (
    <div
      aria-label={label}
      aria-details="Participante"
      className={`size-[inherit] text-white font-bold rounded-full flex justify-center items-center mr-1`}
      style={{ backgroundColor: color }}
    >
      {letter}
    </div>
  );
};
