import { useToast } from "@/components/ui/use-toast";
import TooltipWrapper from "@/components/wrappers/tooltip-wrapper";
import { copyTextToClipboard } from "@/lib/utils";

type ShareComponentProps = {
  shareData: {
    title: string;
    text: string;
    url: string;
  };
  content: React.ReactNode;
};

const ShareComponent = ({ shareData, content }: ShareComponentProps) => {
  const { toast } = useToast();

  const handleShareClick = async () => {
    try {
      await copyTextToClipboard(shareData.url);
    } catch (e: any) {
      console.log("Could not copy share link: ", shareData.url);
    }

    try {
      await navigator.share(shareData);
    } catch (error) {}

    toast({
      title: "Copied link",
      description: `Link has been copied to clipboard. You can paste it in your chats 🚀`,
      duration: 3000,
    });
  };

  return (
    <div className="w-full flex">
      <TooltipWrapper
        triggerContent={
          <div
            className="cursor-pointer mx-auto"
            onClick={async () => {
              handleShareClick();
            }}
          >
            {content}
          </div>
        }
        tooltipContent={<span>Share with friends</span>}
      />
    </div>
  );
};

export default ShareComponent;
