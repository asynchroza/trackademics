import ControlButton from "./ControlButton";
import { NAVIGATION_PATHS } from "~/app/_constants/navigation";
import { FaSquarePlus } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";

const ICONS_SIZE = 80;

export default function HomeControls() {
  return (
    <div className="flex justify-between justify-items-center">
      <ControlButton
        className="bg-orange-500"
        icon={<IoVideocam size={ICONS_SIZE} />}
        href={NAVIGATION_PATHS.START_CALL}
      />
      <ControlButton
        className="bg-blue-400"
        icon={<FaSquarePlus size={ICONS_SIZE} />}
        href={NAVIGATION_PATHS.DASHBOARD_MEETINGS}
      />
    </div>
  );
}
