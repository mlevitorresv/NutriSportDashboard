import React from 'react'
import { PopUpStyled } from './PopUpStyled'
import { PopUpPropsInterface } from '../../interfaces/componentsInterface'


export const PopUp = ({onClose, children}: PopUpPropsInterface) => {
  return (
    <PopUpStyled className="popup-content" onClick={onClose}>
      {children}
    </PopUpStyled>
  )
}
