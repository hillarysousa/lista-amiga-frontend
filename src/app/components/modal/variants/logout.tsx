"use client";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface LogoutProps {
  displayModal: Dispatch<SetStateAction<boolean>>;
}

export const Logout = ({ displayModal }: LogoutProps) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    displayModal(false);
    logout();
    router.push("/");
  };

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <h2 className="text-darkBlue text-base font-semibold text-center">
        Deseja fazer logout?
      </h2>
      <div className="flex flex-row justify-between mt-7">
        <button
          onClick={() => displayModal(false)}
          className="text-darkBlue uppercase py-2 px-5 font-semibold text-sm rounded-sm shadow-(--shadow-card) bg-[#EDEDED]"
        >
          não
        </button>
        <button
          onClick={handleClick}
          className="text-lightYellow uppercase py-2 px-5 font-semibold text-sm bg-darkBlue rounded-sm shadow-(--shadow-card)"
        >
          sim
        </button>
      </div>
    </div>
  );
};
