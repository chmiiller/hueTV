import React from "react";
import Button from "@mui/material/Button";

import MaterialDialog from "./MaterialDialog";

type DialogOptions = {
  title: string;
  onClick: () => void;
  variant: string;
  color?: string;
};

type BasicDialogProps = {
  children: React.ReactNode;
  // contentStyle,
  onClose: () => void;
  options: Array<DialogOptions>;
  title: string;
  visible: boolean;
};

/**
 * @component
 * @description A basic small dialog (modal) component based on MaterialDialog component with some modifications made to size and how action buttons are displayed
 * @param {Object} props
 * @param {JSX} props.children content rendered inside Dialog
 * @param {Object} props.contentStyle additional style added to content
 * @param {Function} props.onClose function called when the Dialog is dismissed by pressing the Esc key or the X button at the top
 * @param {Array.<{title: String, variant: String, color: String, onClick: Function}>} props.options
 * List of Objects to create this Dialog buttons. Variants can be: 'contained', 'outlined' or 'text' (default) and color 'primary', 'secondary' or 'default'
 * @param {String} props.title title on the dialog. Can also be empty
 * @param {Boolean} props.visible when *false* the dialog is hidden and displayed when *true*
 */
const BasicDialog = ({
  children,
  // contentStyle,
  onClose,
  options = [],
  title = "",
  visible = false,
}: BasicDialogProps) => {
  const DialogButtons = () => {
    // const btStyle = { textTransform: 'none' };
    return options.map((op: DialogOptions) => (
      <Button
        key={`bt_${op.title}`}
        // color={op.color}
        disableElevation
        onClick={op.onClick}
        // style={btStyle}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        variant={op.variant}
      >
        {op.title}
      </Button>
    ));
  };

  return (
    <MaterialDialog
      // contentStyle={contentStyle}
      maxWidth="sm"
      onClose={onClose}
      options={DialogButtons()}
      title={title}
      visible={visible}
    >
      {children}
    </MaterialDialog>
  );
};

export default BasicDialog;
