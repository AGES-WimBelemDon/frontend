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
