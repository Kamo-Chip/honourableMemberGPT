import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToAscii = (inputStr: string) => {
  // Matches only printable ASCII characters.
  const asciiPrintableString = inputStr.replace(/[^\x20-\x7E]+/g, "");
  return asciiPrintableString;
};

export const politicalParties = [
  {
    fullName: "African National Congress",
    abbreviation: "anc",
    logoUrl: "anc.png",
  },
  { fullName: "Democratic Alliance", abbreviation: "da", logoUrl: "da.png" },
  { fullName: "uMkhonto we Sizwe", abbreviation: "mk", logoUrl: "mk.png" },
  {
    fullName: "Economic Freedom Fighters",
    abbreviation: "eff",
    logoUrl: "eff.png",
  },
  { fullName: "Inkatha Free Party", abbreviation: "ifp", logoUrl: "ifp.png" },
  {
    fullName: "Government of National Unity",
    abbreviation: "gnu",
    logoUrl: "gnu.png",
  },
];
