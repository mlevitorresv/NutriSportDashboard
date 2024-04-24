import styled from "styled-components";

interface MessageDivStyledPropsInterface{
    bg?: string
}

export const MessageDivStyled = styled.div<MessageDivStyledPropsInterface>`
    padding: 1em 2em 2em;
    background-color: ${props => props.bg ? props.bg : 'white'};
    box-shadow: ${props => props.bg ? 'none' : '0px 4px 4px #00000005'};
    width: 80%;
    margin: auto 10%;
    border-radius: 20px;    
    margin-bottom: 5em;


    &__title{
        color: #393939;
        font-size: 1.2em;
        font-family: 'Poppins';
    }
}
`