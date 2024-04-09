import React from 'react'
import { MessageInfoStyled } from './MessageInfoStyled'
import { MessageInfoPropsInterface } from '../../interfaces/componentsInterface'

export const MessageInfo = (props: MessageInfoPropsInterface) => {
  return (
    <MessageInfoStyled>
        <img src={props.img} alt="room of hotel" />
        <div>
            <p className='name'>{props.name}</p>
            <p className='id'>{props.id}</p>
            <p className='join'>Joined At: {props.join}</p>
        </div>
    </MessageInfoStyled>
  )
}
