import React from 'react'
import { KPIStyled } from './KPIStyled'
import { IconContainerKPIStyled } from './IconContainerKPIStyled'
import { DataContainerKPIStyled } from './DataContainerKPIStyled'
import { KPIPropsInterface } from '../../interfaces/componentsInterface'

export const KPI = (props: KPIPropsInterface) => {
  return (
    <KPIStyled>
        <IconContainerKPIStyled className='iconContainer'>
            {props.icon}
        </IconContainerKPIStyled>
        <DataContainerKPIStyled className='dataContainer'>
            <p className='dataContainer__number'>{props.number}</p>
            <p className='dataContainer__text'>{props.text}</p>
        </DataContainerKPIStyled>
    </KPIStyled>
  )
}
