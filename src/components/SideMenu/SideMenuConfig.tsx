import { HomeIcon } from '../SvgIcons/HomeIcon';
import { LightIcon } from '../SvgIcons/LightIcon';
import { SettingsIcon } from '../SvgIcons/SettingsIcon';

export type SideMenuObject = {
  id: string;
  path: string;
  focusName: string;
  title: string;
  screenName: string;
  icon?: JSX.Element;
};

type SideMenuConfigObject = {
  items: Array<SideMenuObject>;
  extra: Array<SideMenuObject>;
};

export const sideMenuConfig: SideMenuConfigObject = {
  items: [
    {
      id: "menu_item_root",
      path: "/home",
      focusName: "menu_home_screen",
      title: "Home",
      screenName: "home_screen",
      icon: <HomeIcon />,
    },
    {
      id: "menu_item_lights",
      path: "/lights",
      focusName: "menu_lights_screen",
      title: "Lights",
      screenName: "lights_screen",
      icon: <LightIcon />,
    },
    {
      id: "menu_item_settings",
      path: "/settings",
      focusName: "menu_settings_screen",
      title: "Settings",
      screenName: "settings_screen",
      icon: <SettingsIcon />,
    },
  ],
  extra: [
    {
      id: "menu_item_about",
      path: "/about",
      focusName: "menu_about_screen",
      title: "About",
      screenName: "about_screen",
    },
    {
      id: "menu_item_exit",
      path: "/exit",
      focusName: "menu_exit_app",
      title: "Exit",
      screenName: "exit_screen",
    },
  ],
};
