"use client";

import {
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
  forwardRef,
} from "react";

export type PopoverHandle = {
  open: (param?: string) => void;
  close: () => void;
};

type PopoverProps = {
  children: React.ReactNode;
};

export const Popover = forwardRef<PopoverHandle, PopoverProps>(
  ({ children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [translateY, setTranslateY] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const startYRef = useRef<number | null>(null);

    useImperativeHandle(ref, () => ({
      open: (param) => {
        console.log(param);
        setTranslateY(0);
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
    }));
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

    useEffect(() => {
      if (!isOpen) return;

      const handleTouchStart = (e: TouchEvent) => {
        startYRef.current = e.touches[0].clientY;
        setIsDragging(true);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (startYRef.current === null) return;
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startYRef.current;

        if (deltaY > 0) {
          setTranslateY(deltaY);
        }
      };

      const handleTouchEnd = () => {
        const threshold = 80;

        if (translateY > threshold) {
          setIsOpen(false);
        } else {
          setTranslateY(0);
        }

        setIsDragging(false);
        startYRef.current = null;
      };

      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }, [isOpen, translateY]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex justify-center">
        <div className="absolute inset-0 bg-black/50 pointer-events-auto" />

        <div
          ref={containerRef}
          className={`relative z-800 h-full items-end flex transition-transform duration-300 ${
            !isDragging ? "ease-out" : "transition-none"
          }`}
          style={{
            transform: `translateY(${translateY}px)`,
          }}
        >
          <div className="px-4 pt-2 pb-6 bg-white shadow-md rounded-t-xl w-screen text-center h-1/4 flex flex-col">
            <hr className="pb-8 border-t-3 w-16 self-center border-t-darkText" />
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Popover.displayName = "Popover";
