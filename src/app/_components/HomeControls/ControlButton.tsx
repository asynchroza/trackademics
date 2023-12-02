"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FocusedState = "initialized" | "focused" | "unfocused";

const getControlButtonAnimationClassName = (state: FocusedState) => {
  switch (state) {
    case "focused":
      return `animate-button-up`;
    case "initialized":
      return ``;
    case "unfocused":
      return "animate-button-down";
  }
};

export default function ControlButton({
  icon,
  href,
  className = "",
}: {
  icon: React.ReactNode;
  href: string;
  className: string;
}) {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState<FocusedState>("initialized");

  return (
    <div
      // prevent a bug where the focused state is rapidly enabled 
      // and disabled on the end state due to the mouse position.
      className="py-[-4px]"
      onMouseLeave={() => {
        setIsFocused("unfocused");
      }}
    >
      <div
        className={cn(
          className,
          `mx-2 h-[15vh] rounded-3xl p-4`,
          getControlButtonAnimationClassName(isFocused),
        )}
        onClick={() => {
          router.push(href);
        }}
        onMouseEnter={() => {
          setIsFocused("focused");
        }}
      >
        {icon}
      </div>
    </div>
  );
}
