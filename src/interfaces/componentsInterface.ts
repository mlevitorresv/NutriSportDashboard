
export interface HeaderPropsInterface{
    title: string
}

export interface AsideNavPropsInterface{
    id: string
}

export interface TfooterPropsInterface{
    currentPage: number
    items: number
    itemsPerPage: number
    onPageChanged: Function
}

export interface H1PropsInterface{
    center?: boolean
}


import React, { MouseEventHandler } from "react"

export interface ConciergeContactPropsInterface{
    data: string
}

export interface GuestCheckPropsInterface{
    date: string
    hour: string
}

export interface PhotoDataDivPropsInterface{
    color?: string
    data: React.JSX.Element | string
    className?: string
}

export interface GuestImagePropsInterface{
    img: string
    name: string
    id: string | number | undefined
    join?: string
}

export interface HeaderPropsInterface{
    title: string
}

export interface AsideNavPropsInterface{
    id: string
}

export interface KPIPropsInterface{
    icon: React.JSX.Element
    number: string
    text: string
}

export interface MessagePropsInterface{
    comment: string
    email: string
    join: string
}

export interface MessageInfoPropsInterface{
    email: string
    id?: string
    join: string
}

export interface PopUpPropsInterface{
    onClose: MouseEventHandler<HTMLDivElement>;
    children: React.JSX.Element[]
}

export interface GuestImageRoomPropsInterface{
    img: string
    id: string | undefined
    data: string
}

export interface RoomRatePropsInterface{
    price: number
}

export interface RoomStatusPropsInterface{
    status: string
}

export interface TfooterPropsInterface{
    currentPage: number
    items: number
    itemsPerPage: number
    onPageChanged: Function
}

export interface EmployeeInfoStyledDivFlexInterface{
    dir? : string
    box?: string
}

export interface ElementInfoPStyledInterface{
    size : string;
    type?: string
}

export interface DataPStyledInterface{
    type: string
    title? : boolean
}