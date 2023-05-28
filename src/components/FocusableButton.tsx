import React from "react";
import { withFocusable } from "@noriginmedia/react-spatial-navigation";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

type FocusButtonProps = {
  title: string;
  focused: boolean;
};

const ColorButton = styled(Button)<ButtonProps>(() => ({
  marginLeft: 16,
}));

const FocusButton = ({ title, focused }: FocusButtonProps): JSX.Element => (
  <ColorButton variant={focused ? "contained" : "outlined"}>
    {title}
  </ColorButton>
);

const FocusableButton = withFocusable()(FocusButton);
export default FocusableButton;
