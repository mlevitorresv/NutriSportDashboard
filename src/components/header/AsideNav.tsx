import React from 'react'
import { AsideNavStyled } from './AsideNavStyled'
import { NavLinkStyled } from './NavLinkStyled.js'
import { LuLayoutDashboard } from "react-icons/lu";
import { SlKey } from "react-icons/sl";
import { LuCalendarCheck2 } from 'react-icons/lu';
import { FiUsers } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { DivStyled } from '../common/DivStyled'
import { ButtonStyled } from '../common/ButtonStyled';
import { AsideNavPropsInterface } from '../../interfaces/componentsInterface';


export const AsideNav = (props: AsideNavPropsInterface) => {
  return (
    <AsideNavStyled>
        <img src="../../../public/logoDashboard.png" alt="hotel miranda's logo" />
        <div className='icons'>
            <NavLinkStyled to="/home">
                <LuLayoutDashboard />
                Dashboard
            </NavLinkStyled>
            <NavLinkStyled to="/rooms">
                <SlKey />
                Rooms
            </NavLinkStyled>
            <NavLinkStyled to="/bookings">
                <LuCalendarCheck2 />
                Bookings
            </NavLinkStyled>
            <NavLinkStyled to="/users">
                <FiUsers />
                Users
            </NavLinkStyled>
            <NavLinkStyled to="/contact">
                <FaPhoneAlt />
                Contact
            </NavLinkStyled>
        </div>
        <DivStyled>
            <img src="../../public/levi.jpeg" alt="user photo" />
            <p className='name'>Manuel Leví</p>
            <p className='email'>levitorres66@gmail.com</p>
            <ButtonStyled>Edit</ButtonStyled>
        </DivStyled>
        <p className='desc'>Travl Hotel Admin Dashboard</p>
        <p className='green'>&copy; 2020 All Rights Reserved</p>
        <p className='green'>Made with ♥ by Manuel Leví</p>
    </AsideNavStyled>
  )
}
