import React from 'react'
import { DivKPIStyled } from './DivKPIStyled'
import { KPI } from './KPI'
import { LuBedDouble } from "react-icons/lu";
import { LuCalendarCheck2 } from 'react-icons/lu';
import { BsBoxArrowInLeft, BsBoxArrowInRight } from "react-icons/bs";



export const DivKPI = () => {
  return (
    <DivKPIStyled>
      <KPI icon={<LuBedDouble />} number={'8,461'} text={'New Booking'} />
      <KPI icon={<LuCalendarCheck2 />} number={'963'} text={'Scheduled Room'} />
      <KPI icon={<BsBoxArrowInRight />} number={'753'} text={'Check  In'} />
      <KPI icon={<BsBoxArrowInLeft />} number={'516'} text={'Check  Out'} />
    </DivKPIStyled>
  )
}
