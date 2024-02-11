import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
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
};

export const FocusableButton = ({ title, focusKey, onClick, onArrow, focusable = true, success = false, fail = false}: FocusableButtonProps): JSX.Element => {
  const focusableOptions = {
    onEnterPress: onClick,
    focusKey,
    onArrowPress: onArrow ? onArrow : () => true,
    focusable
  };
  const { ref, focused } = useFocusable(focusableOptions);
  
  let buttonColor = focused ? 'rgba(248, 248, 248, 0.45)' : 'rgba(56, 56, 56, 0.65)';
  if (success) buttonColor = 'rgba(70, 238, 97, 0.65)';
  if (fail) buttonColor = 'rgba(231, 62, 62, 0.65)';

  return (
    <Button ref={ref} sx={{
      height: 80,
      minWidth: 200,
      borderRadius: 2,
      color: '#F8F8F8',
      fontSize: 26,
      fontWeight: 400,
      textTransform: 'none',
      backgroundColor: buttonColor,
    }}>
      {!success && !fail && title}
      {success && !fail && <CheckIcon />}
    </Button>
  );
};