import ReactDOM from 'react-dom/client'
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";
import {ThemeContext} from "@theme";
import {GlobalStyles} from "@global";
import {Layout} from "@/app/layout";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeContext>
      <GlobalStyles/>
      <Layout>
        <App/>
      </Layout>
    </ThemeContext>
  </BrowserRouter>
)
