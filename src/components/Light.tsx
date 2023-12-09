import { FocusDetails, FocusableComponentLayout, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type LightProps = {
  focusKey: string;
  name: string;
  brightness: number;
  color?: string;
  isOn: boolean;
  onClick?: () => void;
  onArrow?: (direction: string) => true;
  onFocus?: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
};

const STR_TURNED_OFF = "Off";

export const Light = ({
  focusKey,
  name,
  brightness,
  color,
  isOn,
  onClick,
  onArrow,
  onFocus
}: LightProps): JSX.Element => {
  const { ref, focused } = useFocusable({
    onEnterPress: onClick,
    focusKey,
    onArrowPress: onArrow ? onArrow : () => true,
    onFocus
  });
  const brightnessHeight = 250 * brightness * 0.01;
  const displayBrightness = isOn
    ? `${brightness}%`
    : STR_TURNED_OFF;

  const dynamicStyle = {
    display: "flex",
    bgcolor: isOn ? color : "transparent",
    borderRadius: 4,
    width: 250,
    height: brightnessHeight,
    transition: "250ms",
  };

  return (
    <div ref={ref}>
      <Typography sx={{ marginLeft: 1 }} gutterBottom variant={"h5"}>
        {name}
      </Typography>
      <Typography sx={{ marginLeft: 1 }} gutterBottom variant={"h5"}>
        {displayBrightness}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          bgcolor: "rgba(56, 56, 56, 0.3)",
          border: focused ? 1 : 0,
          boxShadow: focused ? 1 : 5,
          borderColor: "#8F33C6",
          borderRadius: 3,
          width: 250,
          height: 250,
          marginTop: 4,
        }}
      >
        <Box sx={dynamicStyle} />
        <Box
          sx={{
            width: 250,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            height: 100,
          }}
        />
      </Box>
    </div>
  );
};
