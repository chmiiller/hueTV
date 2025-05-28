import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import Button from "@mui/material/Button";

import { CheckIcon } from "./SvgIcons/CheckIcon";

type FocusableButtonProps = {
  title: string;
  focusKey: string;
  onClick: () => void;
  onArrow?: (direction: string) => true;
  focusable?: boolean;
  success?: boolean;
  fail?: boolean;
  contrast?: boolean;
};

const FOCUSED_COLOR = "rgba(248, 248, 248, 0.45)";
const COLOR = "rgba(56, 56, 56, 0.65)";
const TEXT_COLOR = "#F8F8F8";
const COLOR_CONTRAST = "transparent";
const FOCUSED_COLOR_CONTRAST = "rgba(242, 242, 242, 0.8)";
const TEXT_COLOR_CONTRAST = "rgba(13, 13, 13, 0.8)";
const FOCUSED_TEXT_COLOR_CONTRAST = "#F8F8F8";

export const FocusableButton = ({
  title,
  focusKey,
  onClick,
  onArrow,
  focusable = true,
  success = false,
  fail = false,
  contrast = true,
}: FocusableButtonProps): React.ReactElement => {
  const focusableOptions = {
    onEnterPress: onClick,
    focusKey,
    onArrowPress: onArrow ? onArrow : () => true,
    focusable,
  };
  const { ref, focused } = useFocusable(focusableOptions);

  let buttonColor = focused ? FOCUSED_COLOR : COLOR;
  let textColor = focused ? TEXT_COLOR : FOCUSED_TEXT_COLOR_CONTRAST;
  let weight = 400;
  if (contrast) {
    buttonColor = focused ? FOCUSED_COLOR_CONTRAST : COLOR_CONTRAST;
    textColor = focused ? TEXT_COLOR_CONTRAST : FOCUSED_TEXT_COLOR_CONTRAST;
    weight = focused ? 600 : 400;
  }
  if (success) buttonColor = "rgba(70, 238, 97, 0.65)";
  if (fail) buttonColor = "rgba(231, 62, 62, 0.65)";

  return (
    <Button
      ref={ref}
      sx={{
        height: 80,
        minWidth: 200,
        borderRadius: 2,
        color: textColor,
        fontSize: 26,
        fontWeight: weight,
        textTransform: "none",
        backgroundColor: buttonColor,
      }}
    >
      {!success && !fail && title}
      {success && !fail && <CheckIcon />}
    </Button>
  );
};
