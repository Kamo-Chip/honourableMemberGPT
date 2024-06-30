"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import StandardLoading from "../loading/standard-loading";
import Image from "next/image";

const HeroSection = () => {
  const { toast } = useToast();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "Watch how the app was made 👀",
        description: `Check out this video where I show how I made the app`,
        duration: 1000000000,
        action: (
          <a
            className="flex flex-col"
            href="https://youtu.be/jy0QpkZyCck"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/yt-thumbnail-no-arrow.png"
              width={1280}
              height={720}
              quality={70}
              alt=""
              className="w-[100px] h-[50px] object-cover rounded-md mb-2 border border-gray-200"
            />
            <span className="bg-black py-2 px-4 text-white rounded-md text-sm font-medium text-center">
              Watch
            </span>
          </a>
        ),
      });
    }, 2000);
  }, []);

  if (isPageLoading) return <StandardLoading />;

  return (
    <section className="flex flex-col text-6xl max-w-3xl text-center md:text-8xl leading-tight mt-28">
      <h1 className="font-medium font-interTight">
        Chat with Political Party Manifestos
      </h1>
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
          onClick={() => setIsPageLoading(true)}
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
      <a href="www.google.com" id="link"></a>
    </section>
  );
};

export default HeroSection;
