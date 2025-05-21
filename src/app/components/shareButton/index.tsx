"use client";

import IconShare from "@/app/assets/svg/icon-share";
import { useShareList } from "@/app/hooks/useShareList";

interface ShareButtonProps {
  list: any;
}

export const ShareButton = ({ list }: ShareButtonProps) => {
  const { mutate } = useShareList();
  const hasShareToken = list?.shareToken;

  const openShareWindow = (token: string) => {
    const shareData = {
      title: "Teste",
      text: "Teste!!!!",
      url: `http://localhost:3000?share=${token}`,
    };

    return navigator.share(shareData);
  };

  const handleClick = (id: string) => {
    if (hasShareToken) {
      return openShareWindow(id);
    }
    return mutate(id, {
      onSuccess: (data) => {
        return openShareWindow(data.token);
      },
    });
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
