import { getTheme } from "@/style/theme";
import { useState, useEffect } from "react";

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia(getTheme("light").mediaQuery.mobile).matches);

  useEffect(() => {
    const isMobileQuery = window.matchMedia("(max-width: 768px");

    setIsMobile(isMobileQuery.matches)
  }, [])
  
  return { isMobile }
}