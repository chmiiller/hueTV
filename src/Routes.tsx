import React, { useState } from "react";
import {
  createMemoryRouter,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { getSetupDone } from "./api/storage";

import SideMenu from "./components/SideMenu";

import { Home } from "./scenes/Home";
import { Lights } from "./scenes/Lights";
import { RoomDetailsScreen } from "./scenes/RoomDetailsScreen";
import { LightDetailsScreen } from "./scenes/LightDetailsScreen";
import { Settings } from "./scenes/Settings";
import { About } from "./scenes/About";
import { Onboarding } from "./scenes/Onboarding";

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [setupIsDone, setSetupIsDone] = useState<boolean | null>(null);

  React.useEffect(() => {
    const setupState = getSetupDone();
    const ready = setupState.data ?? false;
    setSetupIsDone(ready);
    if (ready) {
      navigate("/home", { replace: true });
    }
  }, []);

  React.useEffect(() => {
    if (location && location.state?.screen === "onboarding") {
      const setupState = getSetupDone();
      const ready = setupState.data ?? false;
      setSetupIsDone(ready);
      if (ready) {
        navigate("/home", { replace: true });
      }
    }
  }, [location]);

  if (setupIsDone === null) {
    // Loading Indicator
    return <div className="spinner"></div>;
  }

  return (
    <>
      {setupIsDone ? (
        <>
          <SideMenu focusKey="MENU" />
          <div id="detail">
            <Outlet />
          </div>
        </>
      ) : (
        <Onboarding />
      )}
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
