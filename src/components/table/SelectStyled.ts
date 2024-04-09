import styled from "styled-components";

interface SelectStyledPropsInterface {
    type?: string
}

export const SelectStyled = styled.select<SelectStyledPropsInterface>`
    color: #135846;
    border: 1px solid #135846;
    border-radius: 10px;
    padding: 1em;
    margin: ${props => props.type === 'secondary' ? '1em auto' : '2em'};
    width: ${props => props.type === 'secondary' ? '65%' : ''}
`