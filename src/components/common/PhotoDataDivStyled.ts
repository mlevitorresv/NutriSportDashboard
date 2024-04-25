import styled from "styled-components";

interface PhotoDataDivStyledPropsInterface{
  color: string
}

export const PhotoDataDivStyled = styled.p<PhotoDataDivStyledPropsInterface>`
  color: ${props => props.color ? props.color : '#393939'};
`
