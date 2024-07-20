import { AlignVerticalJustifyCenterIcon, LayoutGrid, SatelliteIcon, Settings, SquarePen, Timer, User } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
};

type Menu = {
  href: string;
  label: string;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(){
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: `/dashboard`, // Adjusted to exclude (dashboard)
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Manage",
      menus: [
        {
          href: `/projects`,
          label: "Projects",
          icon: SquarePen,
          submenus: []
        },
        {
          href: `/issues`,
          label: "My issues",
          icon: SatelliteIcon,
          submenus: []
        },
        {
          href: `/activity`,
          label: "Activity",
          icon: Timer,
          submenus: []
        },
        {
          href: `/team`,
          label: "Team",
          icon: AlignVerticalJustifyCenterIcon,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: `/account`,
          label: "Account",
          icon: User,
          submenus: []
        },
        {
          href: `/preferences`,
          label: "Preferences",
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
