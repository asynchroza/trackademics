import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import Navigation from "../_components/Navigation/Navigation";
import { NAVIGATION_PATHS } from "../_constants/navigation";
import { headers as getHeaders } from "next/headers";
import { getFirstSubdomainFromHeaders } from "~/app/_utils/url";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const headers = getHeaders();

  /*
    This branched conditional statement handles the logic for allowing only
    authenticated organization users to access the dashboards
  */
  if (!session) {
    // should pass the referred query so that user can be redirected back to page they were trying to access
    // /api/auth/signin?referred=dashboard
    redirect(NAVIGATION_PATHS.LOGIN);
  } else if (
    session.user.organizationId !== getFirstSubdomainFromHeaders(headers)
  ) {
    // TODO: Make sure this works as expected when database has another seeded organization
    redirect(NAVIGATION_PATHS.LANDING_PAGE);
  }

  return (
    <div>
      <Navigation />
      <div className="flex h-[91.5vh] flex-col items-center justify-center bg-slate-200 text-black">
        {children}
      </div>
    </div>
  );
}
