import ReactDOM from 'react-dom/client'
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";
import {ThemeContext} from "@theme";
import {GlobalStyles} from "@global";
import {Layout} from "@/app/layout";
import {QueryProvider} from "@/api/hooks/QueryProvider";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryProvider>
      <ThemeContext>
        <GlobalStyles/>
        <Layout>
          <App/>
        </Layout>
      </ThemeContext>
    </QueryProvider>
  </BrowserRouter>
)
