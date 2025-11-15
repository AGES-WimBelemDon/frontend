import type { Theme } from "@emotion/react";
import {
  AppRegistration,
  AssignmentAdd,
  Badge,
  Checklist,
  DeveloperBoard,
  Psychology,
  Home,
  PeopleAlt,
} from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";
import type { SxProps } from "@mui/material";

import { strings } from "../../constants";
import type { ValidRoute } from "../../hooks/useRoutes";

export const sidebarOptionsMapper: Partial<SidebarRouteMapper> = {
  "/": {
    text: strings.sidebar.home,
    icon: Home,
  },
  "/frequencias/atividades": {
    text: strings.sidebar.frequency,
    icon: Checklist,
  },
  "/alunos": {
    text: strings.sidebar.students,
    icon: PeopleAlt,
  },
  "/anamnese": {
    text: strings.sidebar.anamnesis,
    icon: Psychology,
  },
  "/atividades": {
    text: strings.sidebar.activities,
    icon: AppRegistration,
  },
  "/turmas": {
    text: strings.sidebar.classes,
    icon: AssignmentAdd,
  },
  "/usuarios": {
    text: strings.sidebar.users,
    icon: Badge,
  },
  ...(import.meta.env.DEV && {
    "/tech-demo": {
      text: strings.sidebar.techDemo,
      icon: DeveloperBoard,
    }
  }),
};

export type SidebarRouteMapper = {
  [key in ValidRoute]: {
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
