import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="flex flex-col text-6xl max-w-3xl text-center md:text-8xl leading-tight mt-14">
      <h1 className="font-medium">Chat with Political Party Manifestos</h1>
      <p className="text-base mt-4 font-light md:text-lg leading-relaxed">
        An AI chatbot that makes you an informed voter by helping you understand
        what political parties have set out in their manifestos without having
        to read the whole document yourself
      </p>
      <Button className="relative w-fit mx-auto mt-8 text-lg py-6 px-8">
        <span className="absolute top-[-3px] right-[-3px] flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        <Link href="/party-chat?party=gnu">Stay in the GNU 🐃</Link>
      </Button>
      <span className="text-sm mt-4 font-normal max-w-96 mx-auto text-gray-600">
        Confused about the GNU? <br />
        Chat with the their statement of intent document to clear things up 🫡
      </span>
    </section>
  );
};

export default HeroSection;
