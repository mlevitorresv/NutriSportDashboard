import styled from "styled-components"

interface ButtonStyledPropsInterface {
    color?: string,
    bg?: string,
    border?: string,
    center?: boolean
}

export const ButtonStyled = styled.button<ButtonStyledPropsInterface>`
    // width: auto;
    font: normal normal 600 14px/21px Poppins;
    color: ${props => props.color ? props.color : '#135846'};
    margin: ${props => props.center ? 'auto' : '1em .1em 0;'};
    padding: 1em;
    background: ${props => props.bg ? props.bg : '#EBF1EF'};
    border: ${props => props.border ? props.border : 'none'};
    border-radius: 8px;
    cursor: pointer;
    grid-column: span 2;
`