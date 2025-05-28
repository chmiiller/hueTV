import React from "react";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";

// import Typography from "@mui/material/Typography";

import { SettingsContent } from "./SettingsContent";

// const SCREEN_TITLE = "Settings";

export const Settings = (): React.ReactElement => {
  const { focusKey } = useFocusable({
    focusKey: "settings_screen",
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: 24,
          marginTop: 24,
        }}
      >
        {/* <Typography align={"center"} variant={"h4"} sx={{ marginRight: 16 }}>
        {SCREEN_TITLE}
      </Typography> */}
        <SettingsContent parentTitle="settings" />
      </div>
    </FocusContext.Provider>
  );
};
