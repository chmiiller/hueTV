import React from "react";
import CSS from "csstype";

import BasicDialog from "../components/BasicDialog";
import { FocusableButton } from "../components/FocusableButton";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import { useLocation } from "react-router-dom";

type Styles = {
  contact: CSS.Properties;
};
const styles: Styles = {
  contact: {
    textAlign: "center",

    color: "white",
    width: "100%",
    height: "100%",
    marginTop: "40px",
  },
};

export const Modal = (): JSX.Element => {
  const { ref, focusKey, focusSelf } = useFocusable({
    focusKey: 'settings_screen'
  });
  const [visible, setVisible] = React.useState<boolean>(false);
  const location = useLocation();
  React.useEffect(() => {
    setTimeout(() => {
      focusSelf();
    }, 100);
  }, [location]);
  const MODAL_OPTIONS = [
    {
      title: "Cancel",
      variant: "outlined",
      onClick: () => {
        console.log(" CANCEL ");
      },
    },
    {
      title: "Confirm",
      variant: "contained",
      // color: 'primary',
      onClick: () => {
        console.log(" CONFIRM ");
      },
    },
  ];

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} style={styles.contact}>
        <FocusableButton
          focusKey={"bt_open_modal"}
          title={"Show Modal"}
          onClick={() => {
            setVisible(true);
          }}
        />
      </div>
      <BasicDialog
        title={"My Modal"}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        options={MODAL_OPTIONS}
      >
        <div>Carlos</div>
      </BasicDialog>
    </FocusContext.Provider>
  );
};
