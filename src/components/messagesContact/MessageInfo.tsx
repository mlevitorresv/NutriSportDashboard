import { MessageInfoStyled } from './MessageInfoStyled'
import { MessageInfoPropsInterface } from '../../interfaces/componentsInterface'

export const MessageInfo = (props: MessageInfoPropsInterface) => {
  return (
    <MessageInfoStyled>
      <p className='email'>{props.email}</p>
      <p className='join'>Joined At: {props.join}</p>
    </MessageInfoStyled>
  )
}
