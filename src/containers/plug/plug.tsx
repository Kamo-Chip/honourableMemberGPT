import TooltipWrapper from "@/components/wrappers/tooltip-wrapper";

const Plug = ({ position }: { position: string }) => {
  return (
    <TooltipWrapper
      tooltipContent={<span>Check out my YouTube channel</span>}
      triggerContent={
        <a
          className={`${position} text-sm py-2 px-4 border-dotted border-gray-200 border-2 rounded-lg font-light bg-white cursor-pointer z-[100] shadow-sm font-grifter tracking-wide`}
          href="https://www.youtube.com/@kamoio"
        >
          Built by Kamo 👨🏾‍💻
        </a>
      }
    />
  );
};

export default Plug;
