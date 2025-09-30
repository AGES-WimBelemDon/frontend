import type { SvgIconComponent } from "@mui/icons-material";

export interface TextCardProps {
  title: string,
  theme: ThemeStyle,
  onClick?: () => void,
  disabled?: boolean,
  icon?: SvgIconComponent,
}

export type ThemeStyle = "light" | "dark";
