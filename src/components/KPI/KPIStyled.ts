import styled from "styled-components";



export const KPIStyled = styled.div`
    background-color: white;
    box-shadow: 0px 4px 4px #00000005;
    border-radius: 12px;
    display: flex;
    align-items: center;
    height: 4em;
    width: 15em;
    padding: 1em;
    font-family: 'Poppins';

    &:hover{
        .iconContainer{
            color: white;
            background-color: #E23428;
        }
    }    
`