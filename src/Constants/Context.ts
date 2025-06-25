import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

export interface extension {
  extend: boolean;
  setExtend:Dispatch<SetStateAction<boolean>>
}

export const LayoutContext = createContext<extension | null>(null)

export const useLayoutContext = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("LayoutContext is not available")
  } 
  return context
}