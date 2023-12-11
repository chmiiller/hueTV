import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FocusContext, useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useLocation } from "react-router-dom";

import ScrollableBox from "../../components/ScrollableBox";
import {
  WELCOME_TITLE,
  WELCOME_MESSAGE,
  ABOUT_TITLE,
  ABOUT_ME,
  MOTIVATION_TITLE,
  MOTIVATION1,
  MOTIVATION2,
  MOTIVATION3,
  OPEN_SOURCE_TITLE,
  OPEN_SOURCE,
  NOTE,
  VERSION_DATE,
} from "./content";

const QR_COFFEE_URL = `https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/d7/b5/cb/d7b5cbcd-ff98-10d3-5596-5dcc4a8d0eac/source/256x256bb.jpg`;
const QR_REPO_URL = `https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/d7/b5/cb/d7b5cbcd-ff98-10d3-5596-5dcc4a8d0eac/source/256x256bb.jpg`;

export const About = (): JSX.Element => {
  const { ref, focusKey } = useFocusable({
    focusKey: 'about_screen',
    isFocusBoundary: true,
  });
  const location = useLocation();
  React.useEffect(() => {
    // settingsGetBridgeAddress();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addEventListener("tizenhwkey", onKey); // No event type for Tizen events =/
    window.addEventListener("keydown", onKey);
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.removeEventListener("tizenhwkey", onKey); // No event type for Tizen events =/
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const onKey = (event: KeyboardEvent) => {
    if (
      event.keyCode === 10009 ||
      event.keyCode === 8 ||
      event.keyCode === 27
    ) {
      // back button
      setFocus("menu_about_screen");
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      if(location.state){
        // focusSelf();
        setFocus('about_scrollable');
      }
    }, 100);
  }, [location]);

  return (
    <FocusContext.Provider value={focusKey}>
      <Box
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 0,
          marginRight: 0,
          marginTop: 8,
        }}
      >
        <ScrollableBox>
          <Typography align={"left"} variant={"h4"}>
            {WELCOME_TITLE}
          </Typography>
          <p />
          <Typography align={"left"} variant={"h6"}>
            {WELCOME_MESSAGE}
          </Typography>
          <br />
          <br />
          <Typography align={"left"} variant={"h4"}>
            {ABOUT_TITLE}
          </Typography>
          <p />
          <Typography align={"left"} variant={"h6"}>
            {ABOUT_ME}
          </Typography>
          <p />
          <Typography align={"left"} variant={"h6"}>
            <strong>Buy me a coffee</strong>
          </Typography>
          <p />
          <Typography align={"left"} variant={"h6"}>
            <img src={QR_COFFEE_URL} alt="Buy me a coffee" />
          </Typography>
          <br />
          <br />
          <Typography align={"left"} variant={"h4"}>
            {MOTIVATION_TITLE}
          </Typography>
          <p />
          <Typography align={"left"} variant={"h6"}>
            {MOTIVATION1}
          </Typography>
          <p />
          <Typography align={"left"} variant={"h6"}>
            {MOTIVATION2}
          </Typography>
          <p />
          <Typography align={"left"} variant={"h6"}>
            {MOTIVATION3}
          </Typography>
          <br />
          <br />
          <Typography align={"left"} variant={"h4"}>
            {OPEN_SOURCE_TITLE}
          </Typography>
          <p />
          <Typography align={"left"} variant={"h6"}>
            {OPEN_SOURCE}
          </Typography>
          <p />
          <Typography align={"left"} variant={"h6"}>
            {" "}
            <strong>GitHub Repository</strong>
          </Typography>
          <p />
          <Typography align={"left"} variant={"h6"}>
            <img src={QR_REPO_URL} alt="GitHub Repository" />
          </Typography>
          <br />
          <Typography align={"left"} variant={"h6"}>
            <strong>{`important note: `}</strong>
            {NOTE}
          </Typography>
          <br />
          <Typography align={"left"} variant={"body1"}>
            {VERSION_DATE}
          </Typography>
        </ScrollableBox>
      </Box>
    </FocusContext.Provider>
  );
};
