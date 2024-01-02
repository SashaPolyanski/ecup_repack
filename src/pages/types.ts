import { FC } from "react";

export type PageConfig = {
  path: string;
  component: FC;
  showNavbar: boolean;
  showSidebar: boolean;
};
