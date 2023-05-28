import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

type FocusableButtonProps = {
  title: string;
};

const ColorButton = styled(Button)<ButtonProps>(() => ({
  marginLeft: 16,
}));
export const FocusableButton = ({ title }: FocusableButtonProps): JSX.Element => {
  const { ref, focused } = useFocusable();
  return (
    <ColorButton ref={ref} variant={focused ? "contained" : "outlined"}>
      {title}
    </ColorButton>
  );
};