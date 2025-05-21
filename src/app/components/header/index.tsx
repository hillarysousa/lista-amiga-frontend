import Image from "next/image";
import LogoColor from "../../assets/svg/logo_color.svg";
import { useListDetails } from "@/app/providers/ListDetailsProvider";
import { ShareButton } from "../shareButton";
import { DeleteListButton } from "../deleteListButton";

interface HeaderProps {
  pageName: string | null;
  isListPage: boolean;
}

const Header = ({ pageName, isListPage }: HeaderProps) => {
  const { data } = useListDetails();
  return (
    <div className="bg-darkYellow rounded-b-4xl w-full pt-4 px-4 pb-25 z-0 relative h-fit">
      <Image
        src={LogoColor}
        width={130}
        alt="Lista Amiga"
        className="pb-9 pt-5"
      />
      <div className="flex flex-row">
        <h1 className="text-darkBlue text-3xl font-bold w-full">
          {pageName || data?.name}
        </h1>
        {isListPage && (
          <div className="flex flex-col gap-3">
            <ShareButton list={data} />
            <DeleteListButton listId={data?.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
