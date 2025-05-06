import Image from "next/image";
import LogoColor from "../../assets/svg/logo_color.svg";

interface HeaderProps {
  pageName: string;
}

const Header = ({ pageName }: HeaderProps) => {
  return (
    <div className="bg-darkYellow rounded-b-4xl w-full pt-4 px-4 pb-25 z-0 relative">
      <Image
        src={LogoColor}
        width={130}
        alt="Lista Amiga"
        className="pb-9 pt-5"
      />
      <h1 className="text-darkBlue text-3xl font-bold">{pageName}</h1>
    </div>
  );
};

export default Header;
