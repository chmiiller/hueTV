import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

type SwitchProps = {
  checked: boolean;
  label: string;
  onChange: () => void;
  size?: "small" | "medium";
};

const SwitchMui = ({
  checked,
  label,
  onChange,
  size,
}: SwitchProps): JSX.Element => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          name={label}
          size={size}
        />
      }
      label={label}
    />
  );
};

export default SwitchMui;
