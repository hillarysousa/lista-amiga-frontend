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
    <div className="fixed bottom-0 left-0 flex w-full h-19 items-end">
      <div className="bg-white w-100 h-13 flex justify-between items-center flex-row flex-nowrap px-4">
        <Link href="/dashboard" className="p-4">
          <IconHome
            className={
              isSelected === "/dashboard" ? "text-darkBlue" : "text-grayIcon"
            }
          />
        </Link>
        <Link href="/list" className="p-4">
          <IconLists
            className={
              isSelected === "/list" ? "text-darkBlue" : "text-grayIcon"
            }
          />
        </Link>
        <Link href="/dashboard" className="block -mt-6">
          <div className="rounded-full border-8 border-white bg-darkYellow p-4">
            <IconPlus className="text-darkBlue" />
          </div>
        </Link>
        <Link href="/item" className="p-4">
          <IconItems
            className={
              isSelected === "/item" ? "text-darkBlue" : "text-grayIcon"
            }
          />
        </Link>
        <Link href="/logout" className="p-4">
          <IconItems
            className={isSelected ? "text-darkBlue" : "text-grayIcon"}
          />
        </Link>
      </div>
    </div>
  );
};

export default Menu;
