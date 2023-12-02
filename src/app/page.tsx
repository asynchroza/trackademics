import Link from "next/link";

import { NAVIGATION_PATHS } from "./_constants/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center justify-center gap-4">
            <Link
              href={NAVIGATION_PATHS.LOGIN}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {"Sign in"}
            </Link>
          </div>
        </div>
    </main>
  );
}
