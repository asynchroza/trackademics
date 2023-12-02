"use client"

import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation'

export default function ControlButton({icon, href, className}: {icon: React.ReactNode, href: string, className: string}) {
    const router = useRouter();
  return (
    <div className={cn(className, "rounded-3xl m-2 p-4")} onClick={() => {router.push(href)}}>
        {icon}
    </div>
  );
}
