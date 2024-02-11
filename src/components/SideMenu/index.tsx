import React, { useRef } from "react";
import MuiDrawer from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import {
  useFocusable,
  FocusContext,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import { SideMenuItems } from "./SideMenuItems";

const drawerWidth = 500;
const closedDrawerWidth = drawerWidth / 4;

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", { duration: 50 }),
  overflowX: "hidden",
  width: drawerWidth,
  backgroundColor: "transparent",
  borderWidth: 1,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", { duration: 50 }),
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

type MenuProps = {
  focusKey: string;
}

const SideMenu = ({ focusKey: focusKeyParam }: MenuProps): JSX.Element => {
  const {
    ref,
    focusSelf,
    hasFocusedChild,
    focusKey
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    onArrowPress: () => true,
  });

  React.useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addEventListener("tizenhwkey", onKey); // No event type for Tizen events =/
    window.addEventListener("keydown", onKey);
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.removeEventListener("tizenhwkey", onKey); // No event type for Tizen events =/
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const onKey = (event: KeyboardEvent) => {
    if (
      event.keyCode === 10009 ||
      event.keyCode === 8 ||
      event.keyCode === 27
    ) {
      // back button
      if (sideMenuIsSelected.current === true) {
        setTimeout(() => {
          setFocus('menu_exit_app');
        }, 100);
      }

    }
  };

  const [open, setOpen] = React.useState<boolean>(true);
  const toggleMenu = (menuOpen: boolean) => setOpen(menuOpen);
  const sideMenuIsSelected = useRef(false);
  sideMenuIsSelected.current = hasFocusedChild;

  return (
    <FocusContext.Provider value={focusKey}>
      <Drawer open={open} variant="permanent">
        <SideMenuItems ref={ref} toggleMenu={toggleMenu} />
      </Drawer>
    </FocusContext.Provider>
  );
};

export default SideMenu;
