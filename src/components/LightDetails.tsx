import React from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import Box from "@mui/material/Box";

import { LightIcon } from "./SvgIcons/LightIcon";
import { LightFillIcon } from "./SvgIcons/LightFillIcon";

type LightDetailsProps = {
  id: string;
  isOn: boolean;
  brightnessPercentage: number;
  color: string;
  notALight: boolean;
  onEnterPress: () => void;
  onArrowPress: (direction: string) => boolean;
  opacity: number;
};

const switchHeight = 600;
const switchHeightFocused = 610;

export const LightDetails = ({
  id,
  isOn,
  brightnessPercentage,
  color,
  notALight,
  onEnterPress,
  onArrowPress,
  opacity,
}: LightDetailsProps): React.ReactElement => {
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress,
    onArrowPress,
    focusKey: `switch_${id}`,
  });
  React.useEffect(() => {
    setTimeout(() => {
      focusSelf();
    }, 100);
  }, [location]);

  const switchBaseHeight = focused ? switchHeightFocused : switchHeight;
  let brightnessHeight = 0;
  if (notALight) {
    brightnessHeight = isOn ? switchBaseHeight * 99 * 0.01 : 0;
  } else {
    brightnessHeight = isOn
      ? switchBaseHeight * brightnessPercentage * 0.01
      : 0;
  }

  const dynamicStyle = {
    bgcolor: notALight ? "#ffe496" : color,
    borderRadius: 4,
    width: 300,
    height: brightnessHeight,
    opacity: opacity,
    transition: "250ms",
  };
  return (
    <div ref={ref}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          bgcolor: "rgba(56, 56, 56, 0.3)",
          boxShadow: focused ? 6 : 0,
          borderColor: "#3f444a",
          borderRadius: 4,
          width: 300,
          height: switchBaseHeight,
          margin: 4,
          position: "relative",
        }}
      >
        {/* Light Brightness view */}
        <Box sx={dynamicStyle} />
        {/* Light Bulb icon container */}
        <Box
          sx={{
            display: "flex",
            width: 300,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            position: "absolute",
            height: 100,
          }}
        >
          {/* Light Bulb icon */}
          {isOn ? <LightFillIcon size={45} /> : <LightIcon size={45} />}
        </Box>
      </Box>
    </div>
  );
};
