import React from "react";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";

import Typography from "@mui/material/Typography";

import { SettingsContent } from "./SettingsContent";

const SCREEN_TITLE = "Welcome to hueTV!";

export const Onboarding = (): React.ReactElement => {
  const { focusKey, focusSelf } = useFocusable({
    focusKey: "onboarding_screen",
  });

  React.useEffect(() => {
    setTimeout(() => {
      focusSelf();
    }, 100);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: 24,
          marginTop: 24,
        }}
      >
        <Typography align={"center"} variant={"h4"} sx={{ marginRight: 16 }}>
          {SCREEN_TITLE}
        </Typography>
        <SettingsContent parentTitle="onboarding" />
      </div>
    </FocusContext.Provider>
  );
};
