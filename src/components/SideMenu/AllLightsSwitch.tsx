import React from "react";
import FocusableMenuItemSwitch from "./FocusableMenuItemSwitch";

import { turnAllLightsOff } from "../../api/hueapi";

type AllLightsSwitchProps = {
  menuOpened: boolean;
  onBecameFocused: () => void;
  onBecameBlurred: () => void;
};

const all_lights_on = "Turn all lights on";
const all_lights_off = "Turn all lights off";

const AllLightsSwitch = ({
  menuOpened,
  onBecameFocused,
  onBecameBlurred,
}: AllLightsSwitchProps): JSX.Element => {
  const [allLightsOff, setAllLightsOff] = React.useState<boolean>(false);

  const onTurnLightsOff = async () => {
    await turnAllLightsOff(allLightsOff);
  };

  return (
    <FocusableMenuItemSwitch
      path={""}
      focusKey={"all_lights"} // withFocusable prop
      current={false}
      menuOpened={menuOpened}
      title={allLightsOff ? all_lights_on : all_lights_off}
      onEnterPress={() => {
        // withFocusable prop
        const newAllLights = !allLightsOff;
        setAllLightsOff(newAllLights);
        onTurnLightsOff();
      }}
      onBecameFocused={onBecameFocused}
      onBecameBlurred={onBecameBlurred} // withFocusable prop
      checked={!allLightsOff}
    />
  );
};

export default AllLightsSwitch;
