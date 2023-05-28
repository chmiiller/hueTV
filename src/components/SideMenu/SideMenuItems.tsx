import React from "react";

import List from "@mui/material/List";
import { useNavigate, useLocation } from "react-router-dom";

import { MenuItem } from "./MenuItem";
import { sideMenuConfig, SideMenuObject } from "./SideMenuConfig";

type SideMenuItemsProps = {
  toggleMenu: (menuOpen: boolean) => void;
  ref: any;
  hasFocusedChild: boolean;
};

const ListStyle = {
  "&& .Mui-selected, && .Mui-selected:hover": {
    backgroundColor: "white",
    "&, & .MuiListItemIcon-root": {
      color: "black",
    },
  },
};

export const SideMenuItems = ({
  toggleMenu,
  ref,
  hasFocusedChild
} :SideMenuItemsProps): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpened, setMenuOpened] = React.useState<boolean>(true);

  const focusedItem = React.useRef("");

  console.log(`Menu has focusedChild: ${hasFocusedChild}`);
  

  const exitApp = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.tizen.application.getCurrentApplication().exit();
  };

  const selectItem = (focusKey: string) => {
    focusedItem.current = focusKey;
    toggleMenu(true);
    setMenuOpened(true);
  };

  const deselectItem = () => {
    focusedItem.current = "";
    setTimeout(() => {
      if (focusedItem.current === "") {
        toggleMenu(false);
        setMenuOpened(false);
      }
    }, 100);
  };

  // Avoid rendering screens if current location is Light/Room Details Screen
  const onDetails: boolean =
    location.pathname === "/light" || location.pathname === "/room";
  // If item is selected from the Light/Room Details Screen back button, this screen should be focused and menu closed
  const fromDetails: boolean = location.state === "details";

  return (
    <div
      ref={ref}
      style={{
        paddingTop: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        marginBottom: 12,
        overflowX: "hidden",
      }}
    >
      <List sx={ListStyle}>
        {sideMenuConfig.items.map((sideMenuObject: SideMenuObject) => {
          return (
            <MenuItem
              key={sideMenuObject.id}
              path={sideMenuObject.path}
              focusKey={sideMenuObject.focusName}
              current={
                location.pathname == sideMenuObject.path && menuOpened === false
              } // if it's the current selected menu item
              menuOpened={menuOpened}
              icon={sideMenuObject.icon}
              selectedIcon={sideMenuObject.selectedIcon}
              title={sideMenuObject.title}
              onClick={() => {
                navigate(sideMenuObject.path, { state: "focus" });
                deselectItem();
              }}
              // onBecameFocused={() => {
              //   // withFocusable prop
              //   if (location.state !== "details") {
              //     selectItem(sideMenuObject.id);
              //   }
              //   // if on details, don't automatically render screen
              //   if (sideMenuObject.id !== "menu_item_settings" && !onDetails) {
              //     navigate(sideMenuObject.path, {
              //       state: fromDetails ? "focus" : null,
              //     });
              //   }
              // }}
              // onBecameBlurred={() => deselectItem()} // withFocusable prop
            />
          );
        })}
      </List>
      {/* Second list of buttons */}
      <List sx={ListStyle}>
        {sideMenuConfig.extra.map((sideMenuObject: SideMenuObject) => {
          return (
            <MenuItem
              key={sideMenuObject.id}
              path={sideMenuObject.path}
              focusKey={sideMenuObject.focusName}
              current={
                location.pathname == sideMenuObject.path && menuOpened === false
              } // if it's the current selected menu item
              menuOpened={menuOpened}
              title={sideMenuObject.title}
              onClick={() => {
                if (sideMenuObject.id === "menu_item_exit") {
                  exitApp();
                  return;
                }
                // deselectItem();
                navigate(sideMenuObject.path, { state: "focus" });
              }}
              // onBecameFocused={() => selectItem(sideMenuObject.id)} // withFocusable prop
              // onBecameBlurred={() => deselectItem()} // withFocusable prop
            />
          );
        })}
      </List>
    </div>
  );
};
