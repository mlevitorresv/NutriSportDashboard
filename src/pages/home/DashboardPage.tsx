
import { MessageDivStyled } from '../../components/messagesContact/MessagesDivStyled'
import { MessagesContainer } from '../../components/messagesContact/MessagesContainer'
import { DivKPI } from '../../components/KPI/DivKPI'

export const Dashboard = () => {
    return (
        <>
            <DivKPI />
            <MessageDivStyled>
                <h1 className='messages__title'>Latest review by customers</h1>
                <MessagesContainer />
            </MessageDivStyled>
        </>
    )
}
