import Image from "next/image";

const YouTubeVideoPlugCard = () => {
  return (
    <div className="absolute top-4 flex items-center w-full max-w-[900px] mx-auto z-10 bg-white border rounded-lg p-4">
      <Image
        src="/images/yt-thumbnail.png"
        width={1280}
        height={720}
        alt=""
        className="w-[160px] h-[90px] rounded-lg mr-4"
      />
      <div className="flex flex-col">
        <span className="text-base font-medium">Watch how the app was made</span>
        <span className="font-light text-sm">5 minute video showing how the app was made</span>
      </div>
    </div>
  );
};

export default YouTubeVideoPlugCard;
