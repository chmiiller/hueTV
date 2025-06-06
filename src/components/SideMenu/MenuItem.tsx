import React from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";

type MenuItemProps = {
  path: string;
  selected?: boolean;
  current?: boolean;
  menuOpened: boolean;
  icon?: React.ReactNode;
  title: string;
  focusKey: string;
  onClick: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onArrow: (direction: string) => boolean;
};

export const MenuItem = ({
  path,
  selected,
  current,
  menuOpened,
  icon,
  title,
  focusKey,
  onClick,
  onFocus,
  onBlur,
  onArrow,
}: MenuItemProps): React.ReactElement => {
  const { ref, focused } = useFocusable({
    onEnterPress: onClick,
    onFocus: onFocus,
    onBlur: onBlur,
    onArrowPress: onArrow,
    focusKey,
  });

  return (
    <div
      ref={ref}
      style={{
        paddingLeft: 32,
        paddingRight: 32,
        marginBottom: 12,
      }}
    >
      <ListItemButton
        selected={focused || selected || current}
        component={RouterLink}
        to={path}
        sx={{
          height: icon ? 78 : 62,
          borderRadius: 2,
        }}
      >
        {icon && <ListItemIcon sx={{ marginLeft: 0 }}>{icon}</ListItemIcon>}
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            fontSize: icon ? 28 : 22,
            marginLeft: 2,
          }}
          sx={{
            opacity: menuOpened ? 1 : 0,
            transform: menuOpened ? "scale(1,1)" : "scale(0,1)",
            transformOrigin: "left",
            transition: "0.1s",
          }}
        />
      </ListItemButton>
    </div>
  );
};
