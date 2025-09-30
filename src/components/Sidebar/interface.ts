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

import type { ValidRoute } from "../../hooks/useRoutes";

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
  [key in ValidRoute]?: {
    text: string;
    icon: SvgIconComponent;
  }
};

export interface SidebarProps {
  allowedRoutes: ValidRoute[];
}

export interface SidebarBurgerIconProps {
  onToggle?: () => void;
  sx?: SxProps<Theme>;
}
