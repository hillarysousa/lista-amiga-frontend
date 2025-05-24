/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ModalTypes } from "@/app/utils/modalTypes";
import {
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
  forwardRef,
} from "react";
import { Logout } from "./variants/logout";

export type ModalHandle = {
  open: (param?: any) => void;
  close: () => void;
};

const modalVariantMap = {
  [ModalTypes.LOGOUT]: Logout,
};

interface ModalProps {
  variant: ModalTypes;
}

export const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ variant = ModalTypes.LOGOUT }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));

    const renderVariantChild = (type: ModalTypes) => {
      const Component = modalVariantMap[type];
      return <Component displayModal={setIsOpen} />;
    };

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div
          ref={containerRef}
          className="bg-white rounded-xl shadow-lg w-3xs max-w-lg p-6"
        >
          {renderVariantChild(variant)}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";
