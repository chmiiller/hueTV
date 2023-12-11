import React from "react";
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import Box from "@mui/material/Box";
import { LightIcon } from './SvgIcons/LightIcon';
import { LightFillIcon } from './SvgIcons/LightFillIcon';

type LightDetailsProps = {
  id: string;
  isOn: boolean;
  brightnessPercentage: number;
  color: string;
  onEnterPress: () => void;
  onArrowPress: (direction: string) => boolean;
  opacity: number;
};

const switchHeight = 600;
const switchHeightFocused = 610;
const iconStyle = { fontSize: 80, marginBottom: 2 };

export const LightDetails = ({
  id,
  isOn,
  brightnessPercentage,
  color,
  onEnterPress,
  onArrowPress,
  opacity,
}: LightDetailsProps): JSX.Element => {
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress,
    onArrowPress,
    focusKey: `switch_${id}`
  });
  React.useEffect(() => {
    setTimeout(() => {
      focusSelf();
    }, 100);
  }, [location]);

  const switchBaseHeight = focused ? switchHeightFocused : switchHeight;
  const brightnessHeight = isOn
    ? switchBaseHeight * brightnessPercentage * 0.01
    : 0;

  const dynamicStyle = {
    bgcolor: color,
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
          {isOn ? (
            <LightFillIcon />
          ) : (
            <LightIcon />
          )}
        </Box>
      </Box>
    </div>
  );
};
