import type { Theme } from '@emotion/react';
import type { SxProps } from '@mui/material';

export type SidebarRouteMapper = {
  [path: string]: {
    text: string;
    icon: React.ReactNode;
    disabled?: boolean;
  }
};

export interface SidebarProps {
  allowedRoutes: string[];
}

export interface SidebarBurgerIconProps {
  onToggle?: () => void;
  sx?: SxProps<Theme>;
}
