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

            case '/bookings':
                setTitle('Guest List');
                break;

            case '/rooms':
                setTitle('Rooms List');
                break;

            case '/users':
                setTitle('Concierge List');
                break;
            case '/contact':
                setTitle('Comments List')
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
