import React from "react";
import CSS from "csstype";

import BasicDialog from "../components/BasicDialog";
import FocusableButton from "../components/FocusableButton";

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

const Modal = (): JSX.Element => {
  const [visible, setVisible] = React.useState<boolean>(false);
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
    <>
      <div style={styles.contact}>
        <FocusableButton
          focusKey={"bt_open_modal"}
          title={"Show Modal"}
          onEnterPress={() => {
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
    </>
  );
};

export default Modal;
