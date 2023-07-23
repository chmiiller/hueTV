import React from "react";
import { createMemoryRouter, Outlet, useNavigate } from "react-router-dom";

import SideMenu from "./components/SideMenu";
import { About } from "./scenes/About";
import RoomDetailsScreen from "./scenes/RoomDetailsScreen";
import LightDetailsScreen from "./scenes/LightDetailsScreen";
import { Lights } from "./scenes/Lights";
import { Settings } from "./scenes/Settings";
import { Home } from "./scenes/Home";

import { getSetupDone } from "./api/storage";

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
      <SideMenu focusKey="MENU"/>
      <div id="detail">
        <Outlet />
        <h1>INSIDE ROUTES</h1>
      </div>
    </>
  );
};


export const router = createMemoryRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "lights",
        element: <Lights />,
      },
      {
        path: "light",
        element: <LightDetailsScreen/>,
      },
      {
        path: "room",
        element: <RoomDetailsScreen/>,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
