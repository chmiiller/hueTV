import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

type FocusableButtonProps = {
  title: string;
  focusKey: string;
  onClick: () => void;
  onArrow?: (direction: string) => true;
};

const ColorButton = styled(Button)<ButtonProps>(() => ({
  marginLeft: 16,
}));
export const FocusableButton = ({ title, focusKey, onClick, onArrow }: FocusableButtonProps): JSX.Element => {
  const focusableOptions = {
    onEnterPress: onClick,
    focusKey,
    onArrowPress: onArrow ? onArrow : () => true
  };
  const { ref, focused } = useFocusable(focusableOptions);
  
  return (
    <ColorButton ref={ref} variant={focused ? "contained" : "outlined"}>
      {title}
    </ColorButton>
  );
};