import styled from "styled-components";

interface TrStyledPropsInterface{
    align?: string
}

export const TrStyled = styled.tr<TrStyledPropsInterface>`
    width: 100%;
    height: 4em;
    vertical-align: ${props => props.align ? props.align : 'top'};
    border: 1px solid black;
    &:hover{
        cursor: pointer;
    }
`