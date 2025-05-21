import { Dispatch, SetStateAction } from "react";

interface LogoutProps {
  displayModal: Dispatch<SetStateAction<boolean>>;
}

export const Logout = ({ displayModal }: LogoutProps) => {
  //   const [itemName, setItemName] = useState<string>("");
  //   const { mutate, isPending } = useCreateItem();

  //   const handleClick = () => {
  //     mutate(itemName, {
  //       onSuccess: () => {
  //         displayModal(false);
  //       },
  //     });
  //   };

  return (
    <div className="flex flex-col w-full h-full justify-between items-start">
      <p onClick={() => displayModal(false)}>oi</p>
    </div>
  );
};
