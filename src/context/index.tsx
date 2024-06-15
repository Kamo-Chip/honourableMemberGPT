"use client";

import { createContext, useContext, useState } from "react";

const PoliticalPartyContext = createContext<any>(undefined);

export const PoliticalPartyWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [politicalPartyContext, setPoliticalPartyContext] = useState("");

  return (
    <PoliticalPartyContext.Provider
      value={{ politicalPartyContext, setPoliticalPartyContext }}
    >
      {children}
    </PoliticalPartyContext.Provider>
  );
};

export const usePoliticalPartyContext = () => {
  return useContext(PoliticalPartyContext);
};
