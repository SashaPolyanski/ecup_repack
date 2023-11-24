import {Component} from "./component";
import {PageConfig} from "@pages";
import {main} from "@constants";

export default {
  component: Component,
  path: main.mainRoot,
  showNavbar: true,
  showSidebar: true
} satisfies PageConfig
