import React from "react";
import { CheckIcon } from "./SvgIcons/CheckIcon";
import { FocusableButton } from "./FocusableButton";

type SettingsButton = {
  title: string,
  focusKey: string,
  onClick: () => void,
  focusable?: boolean,
  success?: boolean;
  fail?: boolean;
};
type SettingsItemProps = {
  button: SettingsButton,
  messagePrimary?: string,
  messageSecondary?: string,
  checkEnabled?: boolean,
}

export const SettingsItem = ({ button, messagePrimary, messageSecondary, checkEnabled }: SettingsItemProps) => {
  return (
    <div style={{        
      marginBottom: 100,
      display: 'flex',
      fontSize: 26,
      fontWeight: 400,
    }}>
      <div style={{
        display: 'flex',
        alignItems: "center",
        justifyContent: "start",
      }}>
        <FocusableButton
          title={button.title}
          focusKey={button.focusKey}
          onClick={button.onClick}
          focusable={button.focusable}
          success={button.success}
          fail={button.fail}
        />
      </div>
      <div style={{
        justifyContent: "space-around",
        display: "flex",
        flexDirection: "column",
        fontSize: 18,
        lineHeight: 2,
        marginLeft: 60
      }}>
        {checkEnabled ? <CheckIcon /> : (
          <p style={{
            textAlign: 'left',
            fontSize: 26
          }}>{messagePrimary} <br/> {messageSecondary}</p>
        )}
      </div>
    </div>
  );
};