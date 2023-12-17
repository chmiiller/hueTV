import React from "react";
import CSS from "csstype";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useFocusable,
  FocusContext,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";

import { getBridgeIpAddress, askUsername } from "../api/hueapi";
import { SettingsItem } from "../components/SettingsItem";
import Typography from "@mui/material/Typography";

type Message = {
  primary: string,
  secondary?: string,
}
type Styles = {
  settingsContainer: CSS.Properties;
};
const styles: Styles = {
  settingsContainer: {
    padding: "50px",
    textAlign: "center",
    backgroundColor: "transparent",
    display: 'flex',
    flexDirection: 'column',
    color: "white",
    alignItems: 'start',
  },
};

const TOTAL_AUTH_TRIES = 20;
const FIRST_MESSAGE_PRIMARY = 'Press enter to setup your bridge';
const FIRST_MESSAGE_SECONDARY = 'You’ll need physical access to the bridge';
const SECOND_MESSAGE = 'Press the button on your bridge';
const THIRD_MESSAGE_PRIMARY = 'Your bridge is connected';
const THIRD_MESSAGE_SECONDARY = `Press "select" to go home`;

export const Settings = (): JSX.Element => {
  const { ref, focusKey, focusSelf } = useFocusable({
    focusKey: 'settings_screen'
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [firstCheck, setFirstCheck] = React.useState<boolean>(false);
  const [secondMessage, setSecondMessage] = React.useState<Message>({ primary: ''});
  const [secondCheck, setSecondCheck] = React.useState<boolean>(false);
  const [thirdMessage, setThirdMessage] = React.useState<Message>({ primary: '', secondary: ''});
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
      if(location.state){
        focusSelf();
      }
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
    setFirstCheck(true);
    setFocus('setup_bridge');
    setSecondMessage({ primary: SECOND_MESSAGE});
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
          setSecondMessage({
            primary: `${SECOND_MESSAGE}`,
            secondary: ''
          });
          setSecondCheck(true);
          return;
        } else {
          setSecondMessage({
            primary: `${count}`,
            secondary: ''
          });
          // on error, keep trying for 20 seconds
          if (count === 0) {
            clearInterval(countInterval);
            setSecondMessage({
              primary: `${SECOND_MESSAGE}`,
              secondary: ''
            });
          }
          count--;
        }
      }, 1100);
    }
  };

  return (
    <FocusContext.Provider value={focusKey}>
      <Typography align={"center"} variant={"h4"} sx={{ marginRight: 16 }}>
        {'Settings'}
      </Typography>
      <div ref={ref} style={styles.settingsContainer}>
        <SettingsItem
          button={{
            title: "Start",
            focusKey: "find_bridge",
            onClick: settingsGetBridgeAddress
          }}
          messagePrimary={FIRST_MESSAGE_PRIMARY}
          messageSecondary={FIRST_MESSAGE_SECONDARY}
          checkEnabled={firstCheck}
        />
        <SettingsItem 
          button={{
            title: "Setup bridge",
            focusKey: "setup_bridge",
            onClick: stepGetUsername
          }}
          messagePrimary={secondMessage.primary}
          checkEnabled={secondCheck}
        />
        <SettingsItem 
          button={{
            title: "Go home",
            focusKey: "home",
            onClick: () => {
              navigate("/home", { state: { screen: 'settings', focus: true }});
            }
          }}
          messagePrimary={thirdMessage.primary}
          messageSecondary={thirdMessage.secondary}
        />
        <p>{debug}</p>
      </div>
    </FocusContext.Provider>
  );
};
