"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { UAParser } from "my-ua-parser";
import Logo from "./assets/svg/logo_white.svg";
import { useAuth } from "./providers/AuthProvider";

export default function Home() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const shareToken = searchParams.get("share");

  const userAgent = new UAParser();
  const isDeviceNotMobile = userAgent.getDevice().type !== "mobile";
  const router = useRouter();

  useEffect(() => {
    if (isDeviceNotMobile) {
      return window.alert(
        "Esse site pode ser visualizado apenas em dispositivos móveis."
      );
    }
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push(shareToken ? `/lists?share=${shareToken}` : "/dashboard");
    }
  });

  return (
    <div className="grid justify-items-center min-h-screen h-screen pb-2 bg-lightYellow bg-[url(./assets/img/pattern.png)] content-between">
      <div className="self-center mt-60">
        <Image
          src={Logo}
          alt="Lista Amiga"
          width={300}
          className="mb-34"
          priority
        />
        <a
          onClick={login}
          className="flex items-center border border-gray-600 rounded-lg shadow-sm bg-white hover:shadow-md transition px-4 h-12"
        >
          <div className="w-5 h-5 mr-3 flex items-center justify-center">
            <Image
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-5 h-5"
              width={10}
              height={10}
            />
          </div>
          <span className="text-darkText text-base font-normal">
            Entrar com Google
          </span>
        </a>
      </div>
      <footer className="text-xs text-neutral-700 text-center self-end">
        © 2025 Hillary Sousa — Visão, design e código
      </footer>
    </div>
  );
}
