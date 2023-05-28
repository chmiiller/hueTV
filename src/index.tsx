import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initNavigation } from "@noriginmedia/react-spatial-navigation";

import FocusableApp from "./App";

// initNavigation();

const router = createBrowserRouter([
  {
    path: "/",
    element: <FocusableApp />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
