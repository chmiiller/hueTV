import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

type FocusableButtonProps = {
  title: string;
  focusKey: string;
  onClick: () => void;
  onArrow?: (direction: string) => true;
};

export const FocusableButton = ({ title, focusKey, onClick, onArrow }: FocusableButtonProps): JSX.Element => {
  const focusableOptions = {
    onEnterPress: onClick,
    focusKey,
    onArrowPress: onArrow ? onArrow : () => true
  };
  const { ref, focused } = useFocusable(focusableOptions);
  
  return (
    <Button ref={ref} sx={{
      height: 80,
      minWidth: 200,
      borderRadius: 2,
      color: '#F8F8F8',
      fontSize: 26,
      fontWeight: 400,
      textTransform: 'none',
      backgroundColor: focused ? 'rgba(248, 248, 248, 0.45)' : 'rgba(56, 56, 56, 0.65)',
    }}>
      {title}
    </Button>
  );
};