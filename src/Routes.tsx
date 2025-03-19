import React from "react";
import { createMemoryRouter, Outlet, useNavigate } from "react-router";

import { getSetupDone } from "./api/storage";

import SideMenu from "./components/SideMenu";

import { Home } from "./scenes/Home";
import { Lights } from "./scenes/Lights";
import { RoomDetailsScreen } from "./scenes/RoomDetailsScreen";
import { LightDetailsScreen } from "./scenes/LightDetailsScreen";
import { Settings } from "./scenes/Settings";
import { About } from "./scenes/About";

const Root = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const setupState = getSetupDone();
    if (setupState.data) {
      navigate("/home", { replace: true });
    } else {
      navigate("/settings", { replace: true });
    }
  }, []);

  return (
    <>
      <SideMenu focusKey="MENU" />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export const router = createMemoryRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "home", element: <Home /> },
      { path: "lights", element: <Lights /> },
      { path: "room", element: <RoomDetailsScreen /> },
      { path: "light", element: <LightDetailsScreen /> },
      { path: "settings", element: <Settings /> },
      { path: "about", element: <About /> },
    ],
  },
]);
