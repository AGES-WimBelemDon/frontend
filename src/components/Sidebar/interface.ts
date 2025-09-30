import type { Theme } from "@emotion/react";
import {
  AppRegistration,
  AssignmentAdd,
  Badge,
  Checklist,
  DeveloperBoard,
  Home,
  PeopleAlt,
} from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";
import type { SxProps } from "@mui/material";

export const sidebarOptionsMapper: SidebarRouteMapper = {
  "/": {
    text: "Página Inicial",
    icon: Home,
  },
  "/frequencias/atividades": {
    text: "Frequência",
    icon: Checklist,
  },
  "/alunos": {
    text: "Alunos",
    icon: PeopleAlt,
    disabled: true,
  },
  "/atividades": {
    text: "Atividades",
    icon: AppRegistration,
  },
  "/turmas": {
    text: "Turmas",
    icon: AssignmentAdd,
  },
  "/usuarios": {
    text: "Usuários",
    icon: Badge,
  },
  ...(import.meta.env.DEV && {
    "/tech-demo": {
      text: "Tech Demo",
      icon: DeveloperBoard,
    }
  }),
};

export type SidebarRouteMapper = {
  [path: string]: {
    text: string;
    icon: SvgIconComponent;
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
