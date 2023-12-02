import { redirect } from "next/navigation";
import { NAVIGATION_PATHS } from "../_constants/navigation";

export default function Dashboard() {
  redirect(NAVIGATION_PATHS.DASHBOARD_HOME);
}
