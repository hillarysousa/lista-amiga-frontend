"use client";

import Link from "next/link";
import IconHome from "../../assets/svg/icon-home";
import IconLists from "../../assets/svg/icon-lists";
import IconItems from "../../assets/svg/icon-items";
import IconPlus from "../../assets/svg/icon-plus";

interface MenuProps {
  isSelected: string | null;
}

const Menu = ({ isSelected }: MenuProps) => {
  return (
    <div
      aria-label="Menu"
      aria-roledescription="Menu"
      className="fixed bottom-0 left-0 flex w-full h-19 items-end"
    >
      <div className="bg-white w-100 h-13 flex justify-between items-center flex-row flex-nowrap px-4">
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
              isSelected?.includes("/lists") ? "text-darkBlue" : "text-grayIcon"
            }
          />
        </Link>
        <Link aria-label="Criar novo" href="/dashboard" className="block -mt-6">
          <div className="rounded-full border-8 border-white bg-darkYellow p-4">
            <IconPlus className="text-darkBlue" />
          </div>
        </Link>
        <Link aria-label="Itens" href="/items" className="p-4">
          <IconItems
            className={
              isSelected?.includes("/items") ? "text-darkBlue" : "text-grayIcon"
            }
          />
        </Link>
        <Link aria-label="Fazer logout" href="/logout" className="p-4">
          <IconItems
            className={isSelected ? "text-darkBlue" : "text-grayIcon"}
          />
        </Link>
      </div>
    </div>
  );
};

export default Menu;
