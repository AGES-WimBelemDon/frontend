export type SidebarRouteMapper = {
  [path: string]: {
    text: string;
    icon: React.ReactNode;
  }
};

export interface SidebarProps {
  allowedRoutes: string[];
}
