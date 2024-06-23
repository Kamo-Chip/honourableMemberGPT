import TooltipWrapper from "@/components/wrappers/tooltip-wrapper";
import { FaShareSquare } from "react-icons/fa";

type ShareComponentProps = {
  shareData: {
    title: string;
    text: string;
    url: string;
  };
};

const ShareComponent = ({ shareData }: ShareComponentProps) => {
  return (
    <div
      className="cursor-pointer"
      onClick={async () => {
        try {
          await navigator.share(shareData);
        } catch (err) {}
      }}
    >
      <TooltipWrapper
        triggerContent={
          <div className="flex items-center text-white pb-2 pl-4 pr-2 rounded-lg">
            <FaShareSquare size="24px" />
          </div>
        }
        tooltipContent={<span>Share with friends</span>}
      />
    </div>
  );
};

export default ShareComponent;
