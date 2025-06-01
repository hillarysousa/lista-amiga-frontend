"use client";

import IconShare from "@/app/assets/svg/icon-share";
import { useShareList } from "@/app/hooks/useShareList";
import { List } from "@/app/types/list";

interface ShareButtonProps {
  list: List;
  refetch: () => void;
}

export const ShareButton = ({ list, refetch }: ShareButtonProps) => {
  const { mutate } = useShareList();
  const hasShareToken = list?.shareToken;

  const openShareWindow = (token: string) => {
    const shareData = {
      title: "Lista Amiga",
      text: `Oi! Quero compartilhar a lista ${list.name} com você 😊`,
      url: `https://listaamiga.vercel.app/?share=${token}`,
    };

    return navigator.share(shareData);
  };

  const handleClick = (id: string) => {
    if (!hasShareToken) {
      return mutate(id, {
        onSuccess: (data) => {
          refetch();
          return openShareWindow(data.token);
        },
      });
    }
    return openShareWindow(hasShareToken);
  };

  return (
    <a
      onClick={() => handleClick(list?.id)}
      className="rounded-full bg-darkBlue size-9 flex justify-center items-center"
    >
      <IconShare className="text-lightYellow" />
    </a>
  );
};
