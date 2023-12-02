import { Suspense } from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-200 text-black h-[91.5vh]">
      <Suspense fallback={<h1>LOADING</h1>}>
        <CrudShowcase />
      </Suspense>
    </div>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestReviews = await api.review.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestReviews ? latestReviews.map((review) => (<p key={review.id}>{review.comment}</p>)) : null}
    </div>
  );
}
