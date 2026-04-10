import { NavLink as RouterNavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  to: string;
  children: ReactNode;
}

const NavLink = ({ to, children }: Props) => {
  return (
    <RouterNavLink
      to={to}
      style={({ isActive }) => ({
        color: isActive ? "#ff4d4d" : "white",
        textDecoration: "none",
        fontWeight: isActive ? "bold" : "normal",
      })}
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;