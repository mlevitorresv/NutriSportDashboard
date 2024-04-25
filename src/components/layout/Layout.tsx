import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../header/Header';
import { AsideNav } from '../header/AsideNav';
import { LayoutStyled } from './LayoutStyled'
import { useEffect } from 'react';

export const Layout = () => {

    const location = useLocation();
    const [title, setTitle] = useState('Dashboard');

    useEffect(() => {

        switch (location.pathname) {
            case '/home':
                setTitle('Dashboard');
                break;

            case '/bills':
                setTitle('Bills List');
                break;

            case '/comments':
                setTitle('Comments List');
                break;

            case '/customers':
                setTitle('Customers List');
                break;
            case '/employees':
                setTitle('Employees List')
                break;
            case '/products':
                setTitle('Products List')
                break;
            case '/sales':
                setTitle('Sales List')
                break;
            case '/suppliers':
                setTitle('Suppliers List')
                break;
        }


    }, [location.pathname])


    return (
        <>
            <Header title={title} />
            <LayoutStyled>
                <Outlet />
            </LayoutStyled>
        </>
    )
}
