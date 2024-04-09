import styled from "styled-components";


export const DivStyled = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2em 1em;
    box-shadow: 0px 20px 30px #00000014;
    border-radius: 20px;
    margin-top: 4em;
    

    img{
        width: 75px;
        height: 75px;
        position: absolute;
        bottom: 10em;
        left: 5.5em;
        border-radius: 10px;
    }

    p{
        text-align: center
    }

    .name{
        color: #393939;
        font-size: 1em;
        font-family: 'Poppins';
        font-weight: 800;
        margin-bottom: 0;
    }

    .email{
        color: #B2B2B2;
        font-size: .8em;
        font-family: 'Poppins'
        font-weight: 300;
        margin-bottom: 0;
    }
`