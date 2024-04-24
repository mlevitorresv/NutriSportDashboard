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
import { FaMoneyBills } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { GiMasonJar } from "react-icons/gi";
import { MdOutlinePointOfSale } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";




export const AsideNav = (props: AsideNavPropsInterface) => {
    return (
        <AsideNavStyled>
            <img src="src\assets\logo.JPG" alt="NutriSport's logo" />
            <div className='icons'>
                <NavLinkStyled to="/home">
                    <LuLayoutDashboard />
                    Dashboard
                </NavLinkStyled>
                <NavLinkStyled to="/bills">
                    <FaMoneyBills />
                    Bills
                </NavLinkStyled>
                <NavLinkStyled to="/customers">
                    <FiUsers />
                    Customers
                </NavLinkStyled>
                <NavLinkStyled to="/employees">
                    <GrUserAdmin />
                    Employees
                </NavLinkStyled>
                <NavLinkStyled to="/products">
                    <GiMasonJar />
                    Products
                </NavLinkStyled>
                <NavLinkStyled to="/sales">
                    <MdOutlinePointOfSale />
                    Sales
                </NavLinkStyled>
                <NavLinkStyled to="/suppliers">
                    <FaTruckMoving />
                    Suppliers
                </NavLinkStyled>
                <NavLinkStyled to="/comments">
                    <FaCommentAlt  />
                    Comments
                </NavLinkStyled>
            </div>
            <DivStyled>
                <p className='name'>Manuel Leví</p>
                <p className='email'>levitorres66@gmail.com</p>
                <ButtonStyled>Edit</ButtonStyled>
            </DivStyled>
            <p className='desc'>NutriSport Admin Dashboard</p>
            <p className='green'>&copy; 2024 All Rights Reserved</p>
            <p className='green'>Made with ♥ by Manuel Leví</p>
        </AsideNavStyled>
    )
}
