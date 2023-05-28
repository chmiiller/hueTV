import React from "react";

import List from "@mui/material/List";
import { useNavigate, useLocation } from "react-router-dom";
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import { MenuItem } from "./FocusableMenuItem";
import { sideMenuConfig, SideMenuObject } from "./SideMenuConfig";

type SideMenuItemsProps = {
  toggleMenu: (menuOpen: boolean) => void;
  // setFocus: (item?: string) => void;
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
  // setFocus,
}: SideMenuItemsProps): JSX.Element => {
  const { ref } = useFocusable();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpened, setMenuOpened] = React.useState<boolean>(true);

  const focusedItem = React.useRef("");

  React.useEffect(() => {
    setTimeout(() => {
      // setFocus("menu_home_screen");
    }, 100);
  }, []);

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
              // focusKey={sideMenuObject.focusName} // withFocusable prop
              current={
                location.pathname == sideMenuObject.path && menuOpened === false
              } // if it's the current selected menu item
              menuOpened={menuOpened}
              icon={sideMenuObject.icon}
              selectedIcon={sideMenuObject.selectedIcon}
              title={sideMenuObject.title}
              // onEnterPress={() => {
              //   // withFocusable prop
              //   navigate(sideMenuObject.path, { state: "focus" });
              //   deselectItem();
              // }}
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
              // focusKey={sideMenuObject.focusName} // withFocusable prop
              current={
                location.pathname == sideMenuObject.path && menuOpened === false
              } // if it's the current selected menu item
              menuOpened={menuOpened}
              title={sideMenuObject.title}
              // onEnterPress={() => {
              //   // withFocusable prop
              //   if (sideMenuObject.id === "menu_item_exit") {
              //     exitApp();
              //     return;
              //   }
              //   // deselectItem();
              //   navigate(sideMenuObject.path, { state: "focus" });
              // }}
              // onBecameFocused={() => selectItem(sideMenuObject.id)} // withFocusable prop
              // onBecameBlurred={() => deselectItem()} // withFocusable prop
            />
          );
        })}
      </List>
    </div>
  );
};
