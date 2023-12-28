"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { signIn } from "next-auth/react";
import React, { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { NAVIGATION_PATHS } from "~/app/_constants/navigation";
import { type Organization } from "@prisma/client";
import Image from "next/image";
import { AlertDestructive } from "@/components/ui/alert_destructive";

type LoginData = {
  id: string;
  password: string;
};

const Login = ({
  className = "",
  organization,
}: {
  className?: string;
  organization: Organization;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = React.useState<LoginData>({
    id: "",
    password: "",
  });

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function onSubmit(event: React.SyntheticEvent) {
    // start the loading spinner
    setIsLoading(true);
    event.preventDefault();

    // @ts-expect-error error exists
    const { error } = await signIn("credentials", {
      username: formData.id,
      password: formData.password,
      error: true,
      redirect: false,
    });

    if (!error) {
      router.push(NAVIGATION_PATHS.DASHBOARD_HOME);
    } else {
      // TODO: Display error
      setIsError(true);
      setIsLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8",
        className,
      )}
    >
      <Image src={organization.image} alt="" width={50} height={50} />
      <h1 className="pb-3">TA: {organization.name}</h1>
      <form onSubmit={onSubmit}>
        <div className="grid w-[20vw] gap-2">
          <div className="grid gap-1">
            <AlertDestructive className={isError ? "" : "hidden"} />
            <Label className="sr-only" htmlFor="email">
              Email or Username
            </Label>
            <Input
              id="id"
              placeholder="name@example.com or your username"
              type="text"
              autoCapitalize="none"
              autoComplete="text"
              autoCorrect="off"
              disabled={isLoading}
              onChange={onChange}
            />
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={onChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
