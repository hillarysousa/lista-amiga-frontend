"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Menu from "../components/menu";
import Header from "../components/header";
import { PopoverTypes } from "../utils/popoverTypes";

const pageTitles = {
  dashboard: "Listas",
  lists: "Suas listas",
  items: "Seus itens",
};

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSelected, setIsSelected] = useState<string | null>(null);
  const pathname = usePathname();

  const setPageTitle = (path: string) => {
    const currentPage = Object.entries(pageTitles).find(
      (title) => title[0] === path.split("/")[1]
    );

    console.log(currentPage);

    return currentPage?.[1] ?? "Listas";
  };

  useEffect(() => {
    if (pathname !== isSelected) {
      setIsSelected(pathname);
    }
  }, [isSelected, pathname]);

  return (
    <section className="bg-grayBG min-h-screen h-full flex relative">
      <Header pageName={setPageTitle(pathname)} />
      <div className="px-4 pb-17 absolute top-46 w-full h-fit">{children}</div>
      <Menu isSelected={isSelected} popoverType={PopoverTypes.CREATE_LIST} />
    </section>
  );
}
