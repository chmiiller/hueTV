import { FocusDetails, FocusableComponentLayout, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
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

  const BrightnessLevelView = () => (
    <div style={{
      backgroundColor: isOn ? color : "transparent",
      borderRadius: 12,
      width: 250,
      height: brightnessHeight,
      transition: "250ms",
    }} />
  );

  return (
    <div ref={ref}>
      <Typography sx={{ marginLeft: 1 }} gutterBottom variant={"h5"}>
        {name}
      </Typography>
      <Typography sx={{ marginLeft: 1 }} gutterBottom variant={"h5"}>
        {displayBrightness}
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          backgroundColor: "rgba(56, 56, 56, 0.3)",
          border: 'solid',
          borderWidth: focused ? 2 : 0,
          boxShadow: "0px 4px 4px 0px #1B1919",
          borderColor: "#8F33C6",
          borderRadius: 12,
          width: 250,
          height: 250,
          marginTop: 4,
        }}
      >
        <BrightnessLevelView />
      </div>
    </div>
  );
};
