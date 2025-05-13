import IconCheck from "../../assets/svg/icon-check";

interface RadioCheckProps {
  checked: boolean;
  ownedByUser: boolean;
}

export const RadioCheck = ({ checked, ownedByUser }: RadioCheckProps) => {
  const isCheckedAndOwned = checked && ownedByUser;
  const isCheckedButNotOwned = checked && !ownedByUser;
  const isNotCheckedButIsOwned = !checked && ownedByUser;
  const isNotCheckedAndIsNotOwned = !checked && !ownedByUser;
  return (
    <div
      className={`rounded-full w-5 h-5 border-2 ${
        isNotCheckedButIsOwned && "border-borderEnabled"
      } ${isNotCheckedAndIsNotOwned && "border-borderDisabled bg-gray"} ${
        isCheckedAndOwned && "border-darkBlue bg-darkYellow"
      } ${isCheckedButNotOwned && "border-lightBlue bg-lightYellow"}`}
    >
      {isCheckedAndOwned ||
        (isCheckedButNotOwned && (
          <IconCheck
            className={`${
              isCheckedAndOwned ? "text-darkBlue" : "text-lightBlue"
            }`}
          />
        ))}
    </div>
  );
};
