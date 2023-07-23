import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


type MaterialDialogProps = {
  children: React.ReactNode;
  // contentStyle,
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl";
  onClose: () => void;
  options: Array<JSX.Element>;
  title: string;
  visible: boolean;
};
/**
 * @component
 * @description A Dialog (Modal) component based on Material UI lib with some modifications made to Title styles and how action buttons are displayed
 * @param {Object} props
 * @param {JSX} props.children content rendered inside Dialog
 * @param {Object} props.contentStyle additional style added to content
 * @param {String} props.maxWidth size of component (width). It could be one of those: 'xs', 'sm', 'md' (default), 'lg' or 'xl'
 * @param {Function} props.onClose function called when the Dialog is dismissed by pressing the Esc key or the X button at the top
 * @param {Array} props.options Material UI Buttons for confirming or dismissing the dialog for example
 * @param {String} props.title title on the dialog. Can also be empty
 * @param {Boolean} props.visible when *false* the dialog is hidden and displayed when *true*
 */
const MaterialDialog = ({
  children,
  // contentStyle = {},
  maxWidth = "xs",
  onClose,
  options = [],
  title = "",
  visible = false,
}: MaterialDialogProps) => {
  // <DialogContent style={contentStyle}>{children}</DialogContent>
  return (
    <Dialog
      open={visible}
      fullWidth={true}
      fullScreen
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      maxWidth={maxWidth}
      onClose={onClose} // Esc key callback
    >
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {/* <DialogActions>{options}</DialogActions> */}
    </Dialog>
  );
};

export default MaterialDialog;
