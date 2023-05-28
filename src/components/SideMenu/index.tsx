import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import { SideMenuItems } from "./SideMenuItems";

const drawerWidth = 500;
const closedDrawerWidth = drawerWidth / 4;

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  width: drawerWidth,
  backgroundColor: "transparent",
  borderWidth: 1,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: closedDrawerWidth,
  backgroundColor: "transparent",
  borderWidth: 1,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideMenu = (): JSX.Element => {
  const { ref, focusSelf, focusKey, hasFocusedChild } = useFocusable({
    focusable: true,
    saveLastFocusedChild: false,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: "sidemenu",
    extraProps: { foo: "bar" },
  });

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     focusSelf();
  //   }, 100);
  // }, []);

  React.useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  const [open, setOpen] = React.useState<boolean>(true);
  const toggleMenu = (menuOpen: boolean) => setOpen(menuOpen);

  return (
    <FocusContext.Provider value={focusKey}>
      <Drawer open={open} variant="permanent">
        <SideMenuItems ref={ref} hasFocusedChild={hasFocusedChild} toggleMenu={toggleMenu} />
      </Drawer>
    </FocusContext.Provider>
  );
};

export default SideMenu;
