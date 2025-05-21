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
import {
  clearBridgeIp,
  clearBridgeUsername,
  getSetupDone,
} from "../api/storage";

type Message = {
  primary: string;
  secondary?: string;
};
type Styles = {
  settingsContainer: CSS.Properties;
};
const styles: Styles = {
  settingsContainer: {
    padding: "50px",
    textAlign: "center",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    color: "white",
    alignItems: "start",
  },
};

const TOTAL_AUTH_TRIES = 20;
const FIRST_MESSAGE_PRIMARY = `Select Start to setup the app`;
const FIRST_MESSAGE_SECONDARY = "You’ll need physical access to the Hue Bridge";
const SECOND_MESSAGE = `Press Select to search for your Hue Bridge`;
const THIRD_MESSAGE_PRIMARY = "Press the button on the Hue Bridge to connect";
const FOURTH_MESSAGE_PRIMARY = `You're all set`;
const FOURTH_MESSAGE_SECONDARY = `Go to "home" and find your rooms and lights`;
const RESET_MESSAGE_PRIMARY = `Select reset to disconnect from the Hue Bridge`;
const RESET_MESSAGE_SECONDARY = `You’ll lose connection with your Hue devices`;
const SEARCH_BUTTON_TITLE = "Search";
const BRIDGE_FOUND_BUTTON_TITLE = "Bridge found";
const FIRST_BUTTON_KEY = "settings_start_button";
const SECOND_BUTTON_KEY = "settings_second_button";
const THIRD_BUTTON_KEY = "settings_go_home_button";
const START_BUTTON_TITLE = "Start";
const RESET_BUTTON_TITLE = "Reset";
const GO_HOME_BUTTON_TITLE = "Home";
const SCREEN_TITLE = "Welcome, let's set it up 4";

export const Onboarding = (): React.ReactElement => {
  const { ref, focusKey, focusSelf } = useFocusable({
    focusKey: "onboarding_screen",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [secondButtonTitle, setSecondButtonTitle] =
    React.useState<string>(SEARCH_BUTTON_TITLE);
  const [firstStep, setFirstStep] = React.useState<boolean>(false);
  const [secondStep, setSecondStep] = React.useState<boolean>(false);
  const [thirdStep, setThirdStep] = React.useState<boolean>(false);
  const [setupDone, setSetupDone] = React.useState<boolean>(false);
  const [secondMessage, setSecondMessage] = React.useState<Message>({
    primary: "",
  });
  const [thirdMessage, setThirdMessage] = React.useState<Message>({
    primary: "",
    secondary: "",
  });

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addEventListener("tizenhwkey", onKey); // No event type for Tizen events =/
    window.addEventListener("keydown", onKey);

    setTimeout(() => {
      focusSelf();
      setFocus(FIRST_BUTTON_KEY);

      const setupState = getSetupDone();
      setSetupDone(setupState.data);
    }, 100);

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.removeEventListener("tizenhwkey", onKey); // No event type for Tizen events =/
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // React.useEffect(() => {

  // }, [location]);

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
    if (bridgeAddress) {
      setSecondButtonTitle(BRIDGE_FOUND_BUTTON_TITLE);
      setSecondMessage({
        primary: THIRD_MESSAGE_PRIMARY,
        secondary: `${TOTAL_AUTH_TRIES}`,
      });
      setSecondStep(true);
      stepGetUsername();
    }
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
          // success, set second step to true
          clearInterval(countInterval);
          setSecondMessage({
            primary: `${FOURTH_MESSAGE_PRIMARY}`,
            secondary: `${FOURTH_MESSAGE_SECONDARY}`,
          });
          setThirdStep(true);
          setFocus(THIRD_BUTTON_KEY);
          return;
        } else {
          // on error, keep trying for 20 seconds
          setSecondMessage({
            primary: THIRD_MESSAGE_PRIMARY,
            secondary: `${count}`,
          });
          if (count === 0) {
            // when the count is over, reset
            clearInterval(countInterval);
            setThirdStep(false);
            setSecondButtonTitle(SEARCH_BUTTON_TITLE);
            setSecondMessage({
              primary: `${SECOND_MESSAGE}`,
              secondary: "",
            });
          }
          count--;
        }
      }, 1100);
    }
  };

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: 24,
        }}
      >
        <Typography align={"center"} variant={"h4"} sx={{ marginRight: 16 }}>
          {SCREEN_TITLE}
        </Typography>
        {/* FIRST TIME SETTING UP THE LIGHTS */}
        {!setupDone && (
          <div ref={ref} style={styles.settingsContainer}>
            <SettingsItem
              button={{
                title: START_BUTTON_TITLE,
                focusKey: FIRST_BUTTON_KEY,
                onClick: () => {
                  setFirstStep(true);
                  setFocus(SECOND_BUTTON_KEY);
                  setSecondMessage({ primary: SECOND_MESSAGE, secondary: "" });
                },
                focusable: !firstStep,
                success: firstStep,
              }}
              messagePrimary={FIRST_MESSAGE_PRIMARY}
              messageSecondary={FIRST_MESSAGE_SECONDARY}
            />
            <SettingsItem
              button={{
                title: secondButtonTitle,
                focusKey: SECOND_BUTTON_KEY,
                onClick: () => {
                  if (!secondStep) {
                    settingsGetBridgeAddress();
                  }
                },
                focusable: firstStep,
                success: thirdStep,
              }}
              messagePrimary={secondMessage.primary}
              messageSecondary={secondMessage.secondary}
            />
            <SettingsItem
              button={{
                title: GO_HOME_BUTTON_TITLE,
                focusKey: THIRD_BUTTON_KEY,
                onClick: () => {
                  navigate("/home", {
                    state: { screen: "onboarding", focus: true },
                  });
                },
                focusable: thirdStep,
              }}
              messagePrimary={thirdMessage.primary}
              messageSecondary={thirdMessage.secondary}
            />
          </div>
        )}
        {/* WHEN THE SETUP IS ALREADY DONE! */}
        {setupDone && (
          <div ref={ref} style={styles.settingsContainer}>
            <SettingsItem
              button={{
                title: secondButtonTitle,
                focusKey: SECOND_BUTTON_KEY,
                onClick: () => {
                  if (!secondStep) {
                    settingsGetBridgeAddress();
                  }
                },
                focusable: false,
                success: true,
              }}
              messagePrimary={FOURTH_MESSAGE_PRIMARY}
              messageSecondary={FOURTH_MESSAGE_SECONDARY}
            />
            <SettingsItem
              button={{
                title: RESET_BUTTON_TITLE,
                focusKey: THIRD_BUTTON_KEY,
                onClick: () => {
                  clearBridgeIp();
                  clearBridgeUsername();
                  setSetupDone(false);
                },
              }}
              messagePrimary={RESET_MESSAGE_PRIMARY}
              messageSecondary={RESET_MESSAGE_SECONDARY}
            />
          </div>
        )}
      </div>
    </FocusContext.Provider>
  );
};
