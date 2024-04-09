import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1em;
  height: 2em;
  width: auto;  
  padding-left: 1.5em;
  color: #799283;
  line-height: 2.1em;
  font-size: 1.1em;
  font-weight: 600;
  text-decoration: none;
  font-family: 'Poppins';
  
  &.active {
    color: red;
    border-left: 5px solid #E23428;
  }
`;