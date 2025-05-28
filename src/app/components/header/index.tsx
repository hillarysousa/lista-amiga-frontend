import Image from "next/image";
import { useListDetails } from "@/app/providers/ListDetailsProvider";
import LogoColor from "../../assets/svg/logo_color.svg";
import { ShareButton } from "../shareButton";
import { DeleteListButton } from "../deleteListButton";
import { Loading } from "../loadingFullScreen";
import { useAuth } from "@/app/providers/AuthProvider";

interface HeaderProps {
  pageName: string | null;
  isListPage: boolean;
}

const Header = ({ pageName, isListPage }: HeaderProps) => {
  const { data, isLoading, refetch } = useListDetails();
  const { user } = useAuth();

  const shouldShowButton = data?.owner.uid === user?.uid;

  return (
    <div className="bg-darkYellow rounded-b-4xl w-full pt-4 px-4 pb-25 z-0 relative h-fit">
      <Image
        src={LogoColor}
        width={130}
        alt="Lista Amiga"
        className="pb-9 pt-5"
      />
      <div className="flex flex-row">
        {isListPage ? (
          isLoading ? (
            <Loading small />
          ) : (
            <h1 className="text-darkBlue text-3xl font-bold w-full">
              {data?.name}
            </h1>
          )
        ) : (
          <h1 className="text-darkBlue text-3xl font-bold w-full">
            {pageName}
          </h1>
        )}
        {isListPage && (
          <div className="flex flex-col gap-3">
            {shouldShowButton && (
              <>
                <ShareButton list={data} refetch={refetch} />
                <DeleteListButton listId={data?.id} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
