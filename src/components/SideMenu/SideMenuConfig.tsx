import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export type SideMenuObject = {
  id: string;
  path: string;
  focusName: string;
  title: string;
  icon?: JSX.Element;
  selectedIcon?: JSX.Element;
};

type SideMenuConfigObject = {
  items: Array<SideMenuObject>;
  extra: Array<SideMenuObject>;
};

const iconStyle = { fontSize: 32 };
export const sideMenuConfig: SideMenuConfigObject = {
  items: [
    {
      id: "menu_item_root",
      path: "/home",
      focusName: "menu_home_screen",
      title: "Home",
      icon: <HomeOutlinedIcon style={iconStyle} />,
      selectedIcon: <HomeIcon style={iconStyle} />,
    },
    {
      id: "menu_item_lights",
      path: "/lights",
      focusName: "menu_lights_screen",
      title: "Lights",
      icon: <LightbulbOutlinedIcon style={iconStyle} />,
      selectedIcon: <LightbulbIcon style={iconStyle} />,
    },
    {
      id: "menu_item_settings",
      path: "/settings",
      focusName: "menu_settings_screen",
      title: "Settings",
      icon: <SettingsOutlinedIcon style={iconStyle} />,
      selectedIcon: <SettingsIcon style={iconStyle} />,
    },
  ],
  extra: [
    {
      id: "menu_item_about",
      path: "/about",
      focusName: "menu_about_screen",
      title: "About",
    },
    {
      id: "menu_item_exit",
      path: "/exit",
      focusName: "menu_exit_app",
      title: "Exit",
    },
  ],
};
