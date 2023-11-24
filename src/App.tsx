import './App.css'
import {renderPages} from "./utils/renderPages.tsx";
import {pages} from "./page";

export const App = () => {
  return renderPages(pages)
}

