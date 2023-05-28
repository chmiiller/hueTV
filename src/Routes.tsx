import React from "react";
import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom";

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
    // setFocus();
    const setupState = getSetupDone();
    if (setupState.data) {
      navigate("/home", { replace: true });
    } else {
      navigate("/settings", { replace: true });
    }
  }, []);

  return (
    <>
      <SideMenu />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export const router = createBrowserRouter([
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