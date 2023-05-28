import React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { withFocusable } from "@noriginmedia/react-spatial-navigation";
import { useNavigate, useLocation } from "react-router-dom";

import Light from "../components/Light";
import useInterval from "../api/useInterval";
import { getLights } from "../api/hueapi";
import { Light as LightType } from "../api/types";

type FocusedProps = {
  node: HTMLElement;
};

type LightsProps = {
  setFocus: (item?: any) => void;
};

const API_DELAY = 2000;

const Lights = ({ setFocus }: LightsProps): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleScrolling = ({ node }: FocusedProps) => {
    node.scrollIntoView({ behavior: "smooth", block: "center" });
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
    if (location.state === "focus") {
      setTimeout(() => {
        setFocus();
      }, 100);
    }
  }, [location.state]);

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
    <div style={{ padding: 100 }}>
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
              onBecameFocused={handleScrolling}
              onEnterPress={() => {
                navigate("/light", { state: { id: light.id } });
              }}
            />
          ))}
        </Box>
      </Fade>
    </div>
  );
};

export default withFocusable()(Lights);
