import {
  FocusDetails,
  FocusableComponentLayout,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import Typography from "@mui/material/Typography";

type LightProps = {
  focusKey: string;
  name: string;
  brightness: number;
  color?: string;
  notALight: boolean;
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
const STR_TURNED_ON = "On";

export const Light = ({
  focusKey,
  name,
  brightness,
  color,
  notALight,
  isOn,
  onClick,
  onArrow,
  onFocus,
}: LightProps) => {
  const { ref, focused } = useFocusable({
    onEnterPress: onClick,
    focusKey,
    onArrowPress: onArrow ? onArrow : () => true,
    onFocus,
  });
  const brightnessHeight = !notALight
    ? 250 * brightness * 0.01
    : 250 * 100 * 0.01;
  let displayBrightness = isOn ? `${brightness}%` : STR_TURNED_OFF;
  if (notALight) {
    displayBrightness = isOn ? STR_TURNED_ON : STR_TURNED_OFF;
  }
  const displayColor = notALight ? "#ffe496" : color;

  return (
    <div ref={ref} onClick={onClick}>
      <Typography sx={{ marginLeft: 1 }} gutterBottom variant={"h6"}>
        {name}
      </Typography>
      <Typography sx={{ marginLeft: 1 }} gutterBottom variant={"h6"}>
        {displayBrightness}
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          backgroundColor: "rgba(56, 56, 56, 0.3)",
          border: "solid",
          borderWidth: focused ? 2 : 1,
          // borderWidth: 2,
          // boxShadow: "0px 4px 4px 0px #1B1919",
          borderColor: focused ? "#8F33C6" : "rgba(36, 36, 36, 0.6)",
          borderRadius: 12,
          width: 250,
          height: 250,
          marginTop: 4,
        }}
      >
        {/* Brightness Level Indicator div */}
        <div
          style={{
            backgroundColor: isOn ? displayColor : "transparent",
            borderRadius: 12,
            width: 246,
            height: brightnessHeight,
            transition: "250ms",
          }}
        />
      </div>
    </div>
  );
};
