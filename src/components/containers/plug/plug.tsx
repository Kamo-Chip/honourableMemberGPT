import TooltipWrapper from "@/components/wrappers/tooltip-wrapper";
import { FaYoutube } from "react-icons/fa";

const Plug = ({ position }: { position: string }) => {
  return (
    <TooltipWrapper
      tooltipContent={<span>Check out my YouTube channel</span>}
      triggerContent={
        <a
          className={`${position} text-sm p-2 border-dotted border-gray-200 border-2 rounded-lg font-light bg-white cursor-pointer z-[100] shadow-sm font-grifter tracking-wide flex items-center`}
          href="https://www.youtube.com/@kamoio"
        >
          <FaYoutube color="#FF0000" />
          <span className="ml-2 mt-1">Built by Kamo 👨🏾‍💻</span>
        </a>
      }
    />
  );
};

export default Plug;
