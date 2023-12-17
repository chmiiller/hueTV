import React from "react";
import { CheckIcon } from "./SvgIcons/CheckIcon";
import { FocusableButton } from "./FocusableButton";

type SettingsButton = {
  title: string,
  focusKey: string,
  onClick: () => void,
};
type SettingsItem = {
  button: SettingsButton,
  messagePrimary?: string,
  messageSecondary?: string,
  checkEnabled?: boolean,
}

export const SettingsItem = ({ button, messagePrimary, messageSecondary, checkEnabled }: SettingsItem) => {
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
          }}>{messagePrimary} <br/> {messageSecondary}</p>
        )}
      </div>
    </div>
  );
};