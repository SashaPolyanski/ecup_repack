import {Component} from "./component";
import {PageConfig} from "@pages";
import {games} from "@/constants/pagePath";

export default {
  component: Component,
  path: games.game,
  showNavbar: true,
  showSidebar: true
} satisfies PageConfig
