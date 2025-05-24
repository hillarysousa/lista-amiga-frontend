"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Menu from "@/app/components/menu";
import Header from "@/app/components/header";
import { PopoverTypes } from "@/app/utils/popoverTypes";
import { ListDetailsProvider } from "@/app/providers/ListDetailsProvider";

const pageTitles = {
  dashboard: "Listas",
  lists: "Suas listas",
  items: "Seus itens",
};

export default function ListDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSelected, setIsSelected] = useState<string | null>(null);
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");

  const setPageTitle = (path: string) => {
    const currentPage = Object.entries(pageTitles).find(
      (title) => title[0] === path.split("/")[1]
    );

    return currentPage?.[1] ?? "Listas";
  };

  const isListPage = pathnameArray.length === 3;

  useEffect(() => {
    if (pathname !== isSelected) {
      setIsSelected(pathname);
    }
  }, [isSelected, pathname]);

  return (
    <ListDetailsProvider listId={isListPage ? pathnameArray[2] : undefined}>
      <section className="bg-grayBG min-h-screen h-full flex relative">
        <Header
          pageName={!isListPage ? setPageTitle(pathname) : null}
          isListPage={isListPage}
        />
        <div
          className={`px-4 pb-17 absolute ${
            isListPage ? "top-55" : "top-46"
          } w-full h-fit`}
        >
          {children}
        </div>
        <Menu
          isSelected={isSelected}
          popoverType={
            isListPage ? PopoverTypes.CREATE_ITEM : PopoverTypes.CREATE_LIST
          }
        />
      </section>
    </ListDetailsProvider>
  );
}
