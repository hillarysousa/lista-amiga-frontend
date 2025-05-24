"use client";

import Link from "next/link";
import IconHome from "../../assets/svg/icon-home";
import IconLists from "../../assets/svg/icon-lists";
import IconItems from "../../assets/svg/icon-items";
import IconPlus from "../../assets/svg/icon-plus";
import { useRef } from "react";
import { Popover, PopoverHandle } from "../popover";
import { PopoverTypes } from "@/app/utils/popoverTypes";
import { Modal, ModalHandle } from "../modal";
import { ModalTypes } from "@/app/utils/modalTypes";
import { ParticipantsLetters } from "../participantsLetters";
import { getParticipantsFirstLetters } from "@/app/utils/users";
import { useAuth } from "@/app/providers/AuthProvider";

interface MenuProps {
  isSelected: string | null;
  popoverType: PopoverTypes;
}

const Menu = ({ isSelected, popoverType }: MenuProps) => {
  const { user } = useAuth();
  const popoverRef = useRef<PopoverHandle>(null);
  const modalRef = useRef<ModalHandle>(null);
  return (
    <>
      <div
        aria-label="Menu"
        aria-roledescription="Menu"
        className="fixed bottom-0 left-0 flex w-full h-19 items-end"
      >
        <div className="bg-white w-100 h-13 flex justify-between items-center flex-row flex-nowrap px-4 shadow-(--shadow-menu)">
          <Link aria-label="Dashboard" href="/dashboard" className="p-4">
            <IconHome
              className={
                isSelected === "/dashboard" ? "text-darkBlue" : "text-grayIcon"
              }
            />
          </Link>
          <Link aria-label="Listas" href="/lists" className="p-4">
            <IconLists
              className={
                isSelected?.includes("/lists")
                  ? "text-darkBlue"
                  : "text-grayIcon"
              }
            />
          </Link>
          <a
            aria-label="Criar novo"
            onClick={() => popoverRef.current?.open()}
            className="block -mt-6"
          >
            <div className="rounded-full border-8 border-white bg-darkYellow p-4 shadow-(--shadow-add)">
              <IconPlus className="text-darkBlue" />
            </div>
          </a>
          <Link aria-label="Itens" href="/items" className="p-4">
            <IconItems
              className={
                isSelected?.includes("/items")
                  ? "text-darkBlue"
                  : "text-grayIcon"
              }
            />
          </Link>
          <a
            aria-label="Fazer logout"
            onClick={() => modalRef.current?.open()}
            className="p-4"
          >
            <div className="size-6 relative">
              {user && (
                <ParticipantsLetters
                  color="var(--color-lightBlue)"
                  letter={getParticipantsFirstLetters(user.name)}
                  label={user.name}
                />
              )}
            </div>
          </a>
        </div>
      </div>

      <Popover ref={popoverRef} variant={popoverType} />

      <Modal ref={modalRef} variant={ModalTypes.LOGOUT} />
    </>
  );
};

export default Menu;
