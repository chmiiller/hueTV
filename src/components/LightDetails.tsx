import React from "react";
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

type LightDetailsProps = {
  id: string;
  isOn: boolean;
  brightnessPercentage: number;
  color: string;
  // setFocus: (item?: any) => void;
  // focused: boolean;
  opacity?: number;
};

const switchHeight = 500;
const switchHeightFocused = 510;
const switchBackground = "#22242b";
const iconStyle = { fontSize: 60, marginBottom: 2 };

const STR_BRIGHTNESS = "Brightness";
const STR_TURNED_OFF = "Turned off";

export const LightDetails = ({
  id,
  isOn,
  brightnessPercentage,
  color,
  // setFocus,
  // focused,
  opacity,
}: LightDetailsProps): JSX.Element => {
  const { ref, focused } = useFocusable();
  React.useEffect(() => {
    // setFocus(`switch_${id}`);
  }, []);

  const switchBaseHeight = focused ? switchHeightFocused : switchHeight;
  const brightnessHeight = isOn
    ? switchBaseHeight * brightnessPercentage * 0.01
    : 0;
  const displayBrightness = isOn
    ? `${brightnessPercentage}% ${STR_BRIGHTNESS}`
    : STR_TURNED_OFF;

  const dynamicStyle = {
    bgcolor: color,
    borderRadius: 4,
    width: 250,
    height: brightnessHeight,
    opacity: opacity,
    transition: "250ms",
  };
  return (
    <div ref={ref}>
      <Typography sx={{ marginTop: 1 }} gutterBottom variant={"h6"}>
        {displayBrightness}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          bgcolor: switchBackground,
          border: focused ? 1 : 0,
          boxShadow: focused ? 12 : 0,
          borderColor: "#3f444a",
          borderRadius: 4,
          width: 250,
          height: switchBaseHeight,
          margin: 4,
        }}
      >
        {/* Light Brightness view */}
        <Box sx={dynamicStyle} />
        {/* Light Bulb icon container */}
        <Box
          sx={{
            display: "flex",
            width: 250,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            position: "absolute",
            height: 100,
          }}
        >
          {/* Light Bulb icon */}
          {isOn ? (
            <LightbulbIcon sx={iconStyle} />
          ) : (
            <LightbulbOutlinedIcon sx={iconStyle} />
          )}
        </Box>
      </Box>
    </div>
  );
};
