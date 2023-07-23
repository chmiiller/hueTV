import React from "react";
import CSS from "csstype";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";

import { FocusableButton } from "../components/FocusableButton";
import { getBridgeIpAddress, askUsername } from "../api/hueapi";

type SettingsProps = {
  setFocus: (item?: any) => void;
};

type Styles = {
  contact: CSS.Properties;
};
const styles: Styles = {
  contact: {
    padding: "50px",
    textAlign: "center",
    backgroundColor: "#46282d",
    color: "white",
  },
};

const TOTAL_AUTH_TRIES = 20;

export const Settings = (): JSX.Element => {
  const { ref, focusKey, focusSelf, setFocus } = useFocusable({
    focusKey: 'settings_screen'
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = React.useState<string>("Welcome");
  const [debug, setDebug] = React.useState<string>("");

  React.useEffect(() => {
    // settingsGetBridgeAddress();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addEventListener("tizenhwkey", onKey); // No event type for Tizen events =/
    window.addEventListener("keydown", onKey);
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.removeEventListener("tizenhwkey", onKey); // No event type for Tizen events =/
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      focusSelf();
    }, 100);
  }, [location]);

  const onKey = (event: KeyboardEvent) => {
    if (
      event.keyCode === 10009 ||
      event.keyCode === 8 ||
      event.keyCode === 27
    ) {
      // back button
      setFocus("menu_settings_screen");
    }
  };

  const settingsGetBridgeAddress = async () => {
    const bridgeAddress = await getBridgeIpAddress();
    console.log(
      `>>>>>>>>>>>>> bridgeAddress: ${JSON.stringify(
        bridgeAddress,
        null,
        "    "
      )}`
    );
    setDebug(
      `\n bridge address: ${JSON.stringify(bridgeAddress, null, "    ")}`
    );
  };

  const stepGetUsername = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    let tizenId = "huetv";
    // @ts-expect-error .tizen is not typed
    if (window.tizen) {
      // @ts-expect-error .tizen is not typed
      tizenId = window.tizen.systeminfo.getCapability(
        "http://tizen.org/system/tizenid"
      );
    }
    setMessage(`TizenId ${tizenId}`);
    const userRes = await askUsername(tizenId);
    if (
      userRes.data.error &&
      userRes.data.error.type &&
      userRes.data.error.type === 101
    ) {
      let count = TOTAL_AUTH_TRIES;
      const countInterval = setInterval(async () => {
        // ask for username
        const intervalRes = await askUsername(tizenId);
        if (
          intervalRes &&
          intervalRes.data.success &&
          intervalRes.data.success.username
        ) {
          clearInterval(countInterval);
          setMessage("GOT LAMPS");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
          return;
        } else {
          setMessage(`Please press Hue Bridge button in: ${count} second(s)`);
          // on error, keep trying for 20 seconds
          if (count === 0) {
            clearInterval(countInterval);
            setMessage("Welcome");
          }
          count--;
        }
      }, 1100);
    }
  };

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} style={styles.contact}>
        <h1>Settings</h1>
        <p>{`${message}`}</p>
        <FocusableButton
          title={"Find Bridge"}
          focusKey="find_bridge"
          onClick={() => {
            settingsGetBridgeAddress();
          }}
          onArrow={(direction) => {
            if (direction === 'left') {
              setFocus("menu_lights_screen");
            }
            return true;
          }}
        />
        <FocusableButton
          title={"Setup Bridge"}
          focusKey="setup_bridge"
          onClick={() => {
            stepGetUsername();
          }}
        />
        <FocusableButton
          title={"Go Home"}
          focusKey="home"
          onClick={() => {
            navigate('/home');
          }}
        />
        <p>{debug}</p>
      </div>
    </FocusContext.Provider>
  );
};
