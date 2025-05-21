import React from "react";

import List from "@mui/material/List";
import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useNavigate, useLocation } from "react-router-dom";

import { MenuItem } from "./MenuItem";
import { sideMenuConfig, SideMenuObject } from "./SideMenuConfig";

type SideMenuItemsProps = {
  toggleMenu: (menuOpen: boolean) => void;
  ref: any;
};

const ListStyle = {
  "&& .Mui-selected, && .Mui-selected:hover": {
    backgroundColor: "rgba(248, 248, 248, 0.45)",
    "&, & .MuiListItemIcon-root": {
      color: "white",
    },
  },
};

export const SideMenuItems = ({
  toggleMenu,
  ref,
}: SideMenuItemsProps): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpened, setMenuOpened] = React.useState<boolean>(true);

  const focusedItem = React.useRef("");

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
  const fromDetails: boolean = location.state?.screen === "details";
  const selectedLightId = location.state?.id;

  return (
    <div
      ref={ref}
      style={{
        marginTop: 100,
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
              title={sideMenuObject.title}
              onClick={() => {
                navigate(sideMenuObject.path, {
                  state: { focus: true, screen: sideMenuObject.screenName },
                });
                deselectItem();
              }}
              onArrow={(direction: string) => {
                if (direction === "right") {
                  if (!fromDetails) {
                    toggleMenu(false);
                    setTimeout(() => {
                      navigate(sideMenuObject.path, {
                        state: {
                          focus: true,
                          screen: sideMenuObject.screenName,
                        },
                      });
                      setFocus(sideMenuObject.screenName);
                      deselectItem();
                    }, 100);
                  } else {
                    if (selectedLightId) {
                      setFocus(`switch_${selectedLightId}`);
                    }
                  }
                }
                return true;
              }}
              onFocus={() => {
                if (!fromDetails) {
                  selectItem(sideMenuObject.id);
                }
                // if on details, don't automatically render screen
                if (sideMenuObject.id !== "menu_item_settings" && !onDetails) {
                  navigate(sideMenuObject.path);
                }
              }}
              onBlur={() => {
                deselectItem();
              }}
            />
          );
        })}
      </List>
      <div style={{ height: 12 }} />
      {/* Second list of buttons */}
      <List sx={ListStyle}>
        {sideMenuConfig.extra.map((sideMenuObject: SideMenuObject) => {
          return (
            <MenuItem
              key={sideMenuObject.id}
              path={sideMenuObject.path}
              focusKey={sideMenuObject.focusName}
              current={false} // if it's the current selected menu item
              menuOpened={menuOpened}
              title={sideMenuObject.title}
              onClick={() => {
                if (sideMenuObject.id === "menu_item_exit") {
                  exitApp();
                  return;
                }
                navigate(sideMenuObject.path, {
                  state: { focus: true, screen: sideMenuObject.screenName },
                });
              }}
              onArrow={(direction: string) => {
                if (
                  direction === "right" &&
                  sideMenuObject.id !== "menu_item_exit"
                ) {
                  if (!fromDetails) {
                    setTimeout(() => {
                      navigate(sideMenuObject.path, {
                        state: {
                          focus: true,
                          screen: sideMenuObject.screenName,
                        },
                      });
                      setFocus(sideMenuObject.screenName);
                      deselectItem();
                    }, 100);
                  } else {
                    if (selectedLightId) {
                      setFocus(`switch_${selectedLightId}`);
                    }
                  }
                }
                return true;
              }}
              onFocus={() => selectItem(sideMenuObject.id)}
              onBlur={() => deselectItem()}
            />
          );
        })}
      </List>
    </div>
  );
};
