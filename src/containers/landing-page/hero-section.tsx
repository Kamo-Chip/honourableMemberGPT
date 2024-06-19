import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="flex flex-col text-6xl max-w-3xl text-center md:text-8xl leading-tight mt-28">
      <h1 className="font-medium">Chat with Political Party Manifestos</h1>
      <p className="text-base mt-4 font-light md:text-lg leading-relaxed">
        An AI chatbot that makes you an informed citizen by giving you the TLDR
        of political party manifestos
      </p>
      <Button className="relative w-fit mx-auto mt-8 text-lg py-6 px-8">
        <span className="absolute top-[-3px] right-[-3px] flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        <Link
          href="/party-chat?chattingWith=gnu"
          className="flex items-center justify-center"
        >
          Stay in the GNU{" "}
          <Avatar className="ml-2">
            <AvatarImage src="/party-icons/gnu.png" />
          </Avatar>
        </Link>
      </Button>
      <span className="text-sm mt-4 font-normal max-w-3xl mx-auto text-gray-600">
        Confused about the Government of National Unity? <br />
        Chat with their <i>statement of intent document</i> to clear things up
        🧐
      </span>
    </section>
  );
};

export default HeroSection;
