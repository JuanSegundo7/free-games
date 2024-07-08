"use client";
import { ReactNode } from "react";
import { GameProvider } from "@/contexts/games";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <GameProvider>{children}</GameProvider>;
};

export default Providers;
