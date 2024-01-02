import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeContext } from "@theme";
import { GlobalStyles } from "@global";
import { Layout } from "@/app/layout";
import { QueryProvider } from "@/api/hooks/QueryProvider";

import { Notification } from "@shared";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <ThemeContext>
        <Suspense>
          <GlobalStyles />
          <Layout>
            <App />
            <Notification />
          </Layout>
        </Suspense>
      </ThemeContext>
    </QueryProvider>
  </BrowserRouter>,
);
