import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getLightById,
  setLightBrightness,
  turnLightOn,
  turnLightOff,
  API_INTERVAL,
} from "../api/hueapi";
import useInterval from "../api/useInterval";
import { Light } from "../api/types";

import { LightDetails } from "../components/LightDetails";
import { LightDetailsSkeleton } from "../components/LightDetailsSkeleton";

const STR_TUTORIAL1 = "Arrows Up / Down: Brightness";
const STR_TUTORIAL2 = "Select Button: On / Off";
const STR_TURNED_OFF = "Turned off";
const STR_TURNED_ON = "Turned on";

type LightDetailsLocation = { id: string };

export const LightDetailsScreen = (): React.ReactElement => {
  const location = useLocation();
  const state = location.state as LightDetailsLocation;
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchLight();
  }, [state.id]);

  React.useEffect(() => {
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

  const onKey = (event: KeyboardEvent) => {
    if (
      event.keyCode === 10009 ||
      event.keyCode === 8 ||
      event.keyCode === 27
    ) {
      // back button
      navigate("/lights", { state: { screen: null, focus: true } });
    }
  };

  const [light, setLight] = React.useState<Light>();
  const [opacity, setOpacity] = React.useState<number>(1);

  useInterval(() => {
    fetchLight();
  }, API_INTERVAL);

  const setBrightness = async (brightness: number) => {
    await setLightBrightness({ id: state.id, percentage: brightness });
    fetchLight();
  };

  const switchOnOff = async (turnOn: boolean) => {
    turnOn ? await turnLightOn(state.id) : await turnLightOff(state.id);
    turnOn ? setOpacity(1) : setOpacity(0);
    fetchLight();
  };

  const fetchLight = async () => {
    const _light = await getLightById(state.id);
    if (_light) {
      setLight(_light);
    }
  };

  const onArrow = (direction: string) => {
    if (!light || light.notALight) return;

    let newBrightness = light.brightPercentage;
    switch (direction) {
      case "up":
        newBrightness += 10;
        newBrightness < 100 ? setBrightness(newBrightness) : setBrightness(100);
        break;

      case "down":
        newBrightness -= 10;
        if (newBrightness > 0) {
          setBrightness(newBrightness);
        } else {
          switchOnOff(false);
          setBrightness(0);
        }
        break;
    }
  };

  let displayBrightness = STR_TURNED_OFF;
  if (light?.notALight) {
    displayBrightness = light?.isOn ? STR_TURNED_ON : STR_TURNED_OFF;
  } else {
    displayBrightness = light?.isOn
      ? `${light?.brightPercentage}%`
      : STR_TURNED_OFF;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
      }}
    >
      {!light ? (
        <LightDetailsSkeleton />
      ) : (
        <>
          <Typography variant={"h4"}>{`${light.name}`}</Typography>
          <Typography sx={{ marginTop: 1 }} gutterBottom variant={"h5"}>
            {displayBrightness}
          </Typography>
          <LightDetails
            id={light.id}
            isOn={light.isOn}
            opacity={opacity}
            brightnessPercentage={light.brightPercentage}
            color={light.color}
            notALight={light.notALight}
            onArrowPress={(direction: string) => {
              onArrow(direction);
              // return false to block navigation on vertical directions.
              return !(direction === "up" || direction === "down");
            }}
            onEnterPress={() => {
              switchOnOff(!light.isOn);
            }}
          />
          <Box>
            {!light.notALight && (
              <Typography sx={{ opacity: 0.75 }} gutterBottom variant={"h6"}>
                {STR_TUTORIAL1}
              </Typography>
            )}
            <Typography sx={{ opacity: 0.75 }} gutterBottom variant={"h6"}>
              {STR_TUTORIAL2}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
