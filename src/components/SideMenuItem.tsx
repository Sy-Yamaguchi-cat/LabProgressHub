import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import { Link } from "@tanstack/react-router";

export type Navigation = {
  label: string;
  to: string;
  icon?: React.ReactNode;
  dense?: boolean;
};

function SideMenuItemNavigation({ label, to, icon, dense }: Navigation) {
  return (
    <ListItem disablePadding dense={dense}>
      <ListItemButton component={Link} to={to}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          slotProps={{
            primary: { noWrap: true }
          }}
        >
          {label}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

export type SideMenuItemProps = {
  label: string;
  navigations: Navigation[];
};

export default function SideMenuItem({
  label,
  navigations
}: SideMenuItemProps) {
  const [isToggleOpen, setToggle] = useState(true);
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end" onClick={() => setToggle(!isToggleOpen)}>
            <KeyboardArrowDown
              sx={{
                transition: "0.2s",
                transform: isToggleOpen ? "rotate(-180deg)" : "rotate(0)"
              }}
            />
          </IconButton>
        }
      >
        <ListItemText
          sx={{ flexGrow: 1 }}
          primary={label}
          slotProps={{
            primary: { variant: "h5", noWrap: true }
          }}
        />
      </ListItem>
      {isToggleOpen &&
        navigations.map((navigation) => (
          <SideMenuItemNavigation key={navigation.label} {...navigation} />
        ))}
      <Divider />
    </>
  );
}
