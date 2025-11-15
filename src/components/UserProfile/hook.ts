import { useLayoutEffect, useRef, useState } from "react";

import { setUserLocale, type SupportedLocale, getUserLocale } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import { useRoutes } from "../../hooks/useRoutes";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useSidebar } from "../../hooks/useSidebar";
import { logout } from "../../services/auth.firebase";

export function useUserProfile() {
  const { goTo } = useRoutes();
  const { user, isLoadingAuth } = useAuth();
  const { isMobile, deviceSize } = useScreenSize();
  const {
    getSidebarWidth,
    sidebarState,
    sidebarAnimationDurationMs
  } = useSidebar();
  const animationFrameRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  const [displayedName, setDisplayedName] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const isSidebarOpened = sidebarState === "opened" || sidebarState === "opening";
  const showProfileName = user && (isAnimating || progressRef.current > 0);
  const profileNameMaxWidth = getSidebarWidth(deviceSize);

  async function handleSignOut() {
    try {
      await logout();
      goTo("/login");
    } catch {
      // TODO: Handle sign out error visually
    }
  }

  useLayoutEffect(function animateNameWithSidebar() {
    const name = user?.fullName;
    if (!name) {
      return;
    }

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    const totalChars = name.length;
    const onClosingLimitChars = 20;
    const startProgress = progressRef.current;
    const targetProgress = (sidebarState === "opening" || sidebarState === "opened") ? 1 : 0;
    const startTime = performance.now();

    setIsAnimating(true);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (sidebarState === "opening") {
      setDisplayedName("");
    } else if (sidebarState === "closing") {
      setDisplayedName(name.slice(0, onClosingLimitChars));
    }

    animationFrameRef.current = requestAnimationFrame(function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / sidebarAnimationDurationMs, 1);
      const eased = easeOut(progress);

      progressRef.current = startProgress + (targetProgress - startProgress) * eased;

      let charsToShow: number;
      
      if (sidebarState === "opening" || sidebarState === "opened") {
        charsToShow = Math.round(totalChars * progressRef.current);
        setDisplayedName(name.slice(0, charsToShow));
      } else if (sidebarState === "closing") {
        const truncatedName = name.slice(0, onClosingLimitChars);
        charsToShow = Math.round(onClosingLimitChars * progressRef.current);
        setDisplayedName(truncatedName.slice(0, charsToShow));
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        progressRef.current = targetProgress;
        if (sidebarState === "closing") {
          setDisplayedName("");
        } else {
          setDisplayedName(name);
        }
        setIsAnimating(false);
        animationFrameRef.current = null;
      }
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [sidebarState, user, sidebarAnimationDurationMs]);

  const currentLocale = getUserLocale();
  
  function handleLanguageToggle() {
    const newLocale: SupportedLocale = currentLocale === "pt-BR" ? "en-US" : "pt-BR";
    setUserLocale(newLocale);
  }

  return {
    user,
    handleSignOut,
    isLoadingAuth,
    showProfileName,
    displayedName,
    isMobile,
    isSidebarOpened,
    profileNameMaxWidth,
    currentLocale,
    handleLanguageToggle,
  };
}
