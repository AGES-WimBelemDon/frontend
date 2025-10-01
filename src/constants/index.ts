import { englishTextMap } from "./english";
import { portugueseTextMap } from "./portuguese";

export type SupportedLocale = "pt-BR" | "en-US";

const languageMaps = {
  "pt-BR": portugueseTextMap,
  "en-US": englishTextMap,
} as const;

function getUserLocale(): SupportedLocale {
  const savedLocale = localStorage.getItem("preferred-locale") as SupportedLocale;
  if (savedLocale && savedLocale in languageMaps) {
    return savedLocale;
  }
  
  const browserLocale = navigator.language;
  if (browserLocale.startsWith("pt")) {
    return "pt-BR";
  }
  
  if (browserLocale.startsWith("en")) {
    return "en-US";
  }
  
  return "pt-BR";
}

export function setUserLocale(locale: SupportedLocale): void {
  localStorage.setItem("preferred-locale", locale);
  window.location.reload();
}

export const strings = languageMaps[getUserLocale()];
