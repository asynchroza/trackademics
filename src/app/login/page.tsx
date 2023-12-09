import { getServerAuthSession } from "~/server/auth";
import Login from "../_components/Login/Login";
import { redirect } from "next/navigation";
import { NAVIGATION_PATHS } from "../_constants/navigation";
import { getFirstSubdomainFromHeaders } from "~/app/_utils/url";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  const organizationId = getFirstSubdomainFromHeaders();

  const organization = await api.organization.getOrganization.query({
    id: organizationId,
  });

  if (!organization) {
    redirect(NAVIGATION_PATHS.LANDING_PAGE);
  }

  if (session && session.user.organizationId === organizationId) {
    redirect(NAVIGATION_PATHS.DASHBOARD_HOME);
  }

  return <Login organization={organization} />;
}
