"use client";

import ShareComponent from "@/components/containers/share/share";
import { handleSignIn } from "@/lib/dbFunctions";
import confetti from "canvas-confetti";
import React, { ChangeEventHandler, useState } from "react";
import { FaShareSquare } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import DialogWrapper, { emptyDialogDetails } from "../wrappers/dialog-wrapper";

const MAX_STARTER_PROMPTS = 5;
const MAX_SIGNED_IN_PROMPTS = 10;

type ChatInputProps = {
  handleInputChange: ChangeEventHandler;
  input: string;
};

export const ChatInput = ({ handleInputChange, input }: ChatInputProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogDetails, setDialogDetails] = useState(emptyDialogDetails);
  const signInUser = async () => {
    try {
      const user = await handleSignIn();
      localStorage.setItem("hasSignedIn", "true");
      confetti();
      return user;
    } catch (e: any) {
      console.log("Could not sign in user: ", e.message);
    }
  };

  const validatePrompt = (e: React.MouseEvent<HTMLButtonElement>) => {
    const numPromptsStr = localStorage.getItem("numPrompts");
    let numPrompts = 0;

    if (numPromptsStr) {
      numPrompts = Number.parseInt(numPromptsStr);
    }

    if (numPrompts === 0) {
      localStorage.setItem("numPrompts", "1");
      return;
    }

    const hasSignedIn = localStorage.getItem("hasSignedIn") === "true";
    if (numPrompts >= MAX_STARTER_PROMPTS && !hasSignedIn) {
      e.preventDefault();
      setDialogDetails({
        title: "Seems that you like the app",
        description: `Unfortunately you ran out of prompts. Sign up to get ${
          MAX_SIGNED_IN_PROMPTS - MAX_STARTER_PROMPTS
        } more prompts`,
        footerContent: (
          <Button
            className="mx-auto"
            onClick={async () => {
              const res = await signInUser();
              setIsDialogOpen(false);
              if (res) {
                toast({
                  title: "Thank you for signing in",
                  description: `Use your ${
                    MAX_SIGNED_IN_PROMPTS - MAX_STARTER_PROMPTS
                  } prompts wisely 🧠`,
                  duration: 3000,
                });
              }
            }}
          >
            {"Sign Up - It's free"}
          </Button>
        ),
      });
      setIsDialogOpen(true);
      return;
    }

    if (hasSignedIn && numPrompts >= MAX_SIGNED_IN_PROMPTS) {
      e.preventDefault();
      setDialogDetails({
        title: "OpenAI credits aren't cheap",
        description:
          "Unfortunately you've run out of prompts. Share the app with friends and I'll consider increasing your limit",
        footerContent: (
          <ShareComponent
            shareData={{
              title: "HonourableMemberGPT",
              text: "Check out this chatbot made by a South African student",
              url: "https://www.honourablemembergpt.com",
            }}
            content={
              <Button className="mx-auto text-white">
                Share app
                <span className="ml-2">
                  <FaShareSquare size="24px" />
                </span>
              </Button>
            }
          />
        ),
      });
      setIsDialogOpen(true);
      return;
    }

    localStorage.setItem("numPrompts", `${numPrompts + 1}`);
  };

  return (
    <div className="flex flex-col relative max-w-[900px] mx-auto bg-[#fafafa54] rounded">
      <DialogWrapper
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        dialogDetails={dialogDetails}
      />
      <div
        className={`flex items-center bg-white border-solid border-gray-200 border-[1px] shadow-sm rounded-full py-1 px-2`}
      >
        <Textarea
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full resize-none leading-normal py-0 h-fit max-h-20 min-h-0"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const submitBtn = document.querySelector(
                "#submit-btn"
              ) as HTMLButtonElement;
              submitBtn.click();
            }
          }}
          id="input"
          placeholder="Ask a question about the manifesto..."
        />
        <Button
          type="submit"
          id="submit-btn"
          disabled={input.trim() === ""}
          className={`rounded-full w-[50px] h-[35px] ${
            input.trim() === "" ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={validatePrompt}
        >
          <IoIosSend size="24px" color="#fff" />
        </Button>
      </div>
      <span className="text-xs text-gray-400 font-normal my-2 text-center shadow-[0 0 5px] ">
        HonourableMemberGPT can make mistakes. Check important info.
      </span>
    </div>
  );
};
