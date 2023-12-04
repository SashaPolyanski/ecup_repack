import ReactDOM from 'react-dom/client'
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";
import {ThemeContext} from "@theme";
import {GlobalStyles} from "@global";
import {Layout} from "@/app/layout";
import {QueryProvider} from "@/api/hooks/QueryProvider";

import {Notification} from "@shared";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryProvider>
      <ThemeContext>
        <GlobalStyles/>
        <Layout>
          <App/>
          <Notification/>
        </Layout>
      </ThemeContext>
    </QueryProvider>
  </BrowserRouter>
)
