import { Route, Routes } from "react-router-dom";
import { PageConfig } from "@pages";

export const renderPages = (pages: PageConfig[]) => (
  <Routes>
    {pages.map(({ path, component }) => {
      const Component = component;
      return <Route key={path} path={path} element={<Component />} />;
    })}
  </Routes>
);
