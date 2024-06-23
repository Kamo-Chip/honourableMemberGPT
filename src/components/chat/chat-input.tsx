"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { handleSignIn } from "@/lib/dbFunctions";
import confetti from "canvas-confetti";
import { ChangeEventHandler, useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type ChatInputProps = {
  handleInputChange: ChangeEventHandler;
  input: string;
};
export const ChatInput = ({ handleInputChange, input }: ChatInputProps) => {
  const [numMessages, setNumMessages] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const signInUser = async () => {
    try {
      await handleSignIn();
      localStorage.setItem("hasSignedIn", "true");
      confetti();
    } catch (e: any) {
      console.log("Could not sign in user: ", e.message);
    }
  };

  useEffect(() => {
    if (numMessages == 5) {
      const hasSignedIn = localStorage.getItem("hasSignedIn") === "true";
      if (!hasSignedIn) {
        setOpen(true);
        localStorage.setItem("hasSignedIn", "true");
      }
    }
  }, [numMessages]);

  return (
    <div className="flex flex-col relative max-w-[900px] mx-auto bg-[#fafafa54] rounded">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-[425px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Seems that you like the app</DialogTitle>
            <DialogDescription>
              Sign up to get notified via email when I upload new projects
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="mx-auto"
              onClick={async () => {
                await signInUser();
                setOpen(false);
              }}
            >
              {"Sign Up - It's free"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
          // disabled={input.trim() === ""}
          className={`rounded-full w-[50px] h-[35px] ${
            input.trim() === "" ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => {
            setNumMessages(numMessages + 1);
            const numPrompts = localStorage.getItem("numPrompts");
            if (!numPrompts) {
              localStorage.setItem("numPrompts", "1");
            } else {
              localStorage.setItem(
                "numPrompts",
                `${Number.parseInt(numPrompts) + 1}`
              );
            }
          }}
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
