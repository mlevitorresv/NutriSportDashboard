import styled from "styled-components";

interface InputStyledPropsInterface{
    model: string,
}

export const InputStyled = styled.input<InputStyledPropsInterface>`
    background-color: #FCFCFC ;
    width: ${props => props.model === 'secondary' ? '' : props.model == 'creationform' ? '90%' : '60%'};
    border: 1px solid black;
    border-radius: 12px;
    padding: 1em 1em;
    margin: ${props => props.model === 'secondary' ? '1em' : '1em auto'};
    display: inline;
`