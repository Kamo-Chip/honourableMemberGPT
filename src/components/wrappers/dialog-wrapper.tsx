import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";

export const emptyDialogDetails = {
  title: "",
  description: "",
  footerContent: <></>,
};

export type DialogWrapperProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  dialogDetails: {
    title: string;
    description: string;
    footerContent: React.ReactNode;
  };
};
const DialogWrapper = ({
  open,
  setOpen,
  dialogDetails,
}: DialogWrapperProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[90vw] sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle>{dialogDetails.title}</DialogTitle>
          <DialogDescription>{dialogDetails.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>{dialogDetails.footerContent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
