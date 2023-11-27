import {Component} from "./component";
import {PageConfig} from "@pages";
import {about} from "@constants";

export default {
  component: Component,
  path: about.aboutRoot,
  showNavbar: false,
  showSidebar: false
} satisfies PageConfig
