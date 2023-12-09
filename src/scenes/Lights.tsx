import React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { useFocusable, FocusContext, FocusableComponentLayout, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigate, useLocation } from "react-router-dom";

import { Light } from "../components/Light";
import useInterval from "../api/useInterval";
import { getLights } from "../api/hueapi";
import { Light as LightType } from "../api/types";

const API_DELAY = 2000;

export const Lights = (): JSX.Element => {
  const { ref, focusKey, focusSelf } = useFocusable({
    focusKey: 'lights_screen'
  });
  const navigate = useNavigate();
  const location = useLocation();
  const handleScrolling = (
    layout: FocusableComponentLayout,
  ) => {
    layout.node.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const [lights, setLights] = React.useState<Array<LightType>>([]);
  React.useEffect(() => {
    homeGetLights();
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

  React.useEffect(() => {
    setTimeout(() => {
      if(location.state){
        focusSelf();
      }
    }, 100);
  }, [location]);

  useInterval(() => {
    homeGetLights();
  }, API_DELAY);

  const onKey = (event: KeyboardEvent) => {
    if (
      event.keyCode === 10009 ||
      event.keyCode === 8 ||
      event.keyCode === 27
    ) {
      // back button
      setFocus("menu_lights_screen");
    }
  };

  const homeGetLights = async () => {
    const _lights = await getLights();
    if (_lights !== null) {
      setLights(_lights);
    }
  };

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} style={{ padding: 100 }}>
        <Fade in timeout={600}>
          <Box
            sx={{
              display: "grid",
              rowGap: 5,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {lights.map((light: LightType) => (
              <Light
                key={light.id}
                focusKey={`light_${light.id}`}
                name={light.name}
                brightness={light.brightPercentage}
                color={light.color}
                isOn={light.isOn}
                onFocus={handleScrolling}
                onClick={() => {
                  navigate("/light", { state: { id: light.id } });
                }}
              />
            ))}
          </Box>
        </Fade>
      </div>
    </FocusContext.Provider>
  );
};
