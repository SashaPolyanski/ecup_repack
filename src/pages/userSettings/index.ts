import {Component} from "./component";
import {PageConfig} from "@pages";
import {userSettings} from "@/constants/pagePath";

export default {
  component: Component,
  path: userSettings.userSettingsRoot,
  showNavbar: true,
  showSidebar: true
} satisfies PageConfig
