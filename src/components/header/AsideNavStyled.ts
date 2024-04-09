import styled from "styled-components"



export const AsideNavStyled = styled.nav`
    padding: 2em;
    width: 15em;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: white;
    position: fixed;
    z-index: 100;
    box-shadow: 0 10px 10px gray;


    .icons{
        display: flex;
        flex-direction: column;
        gap: 2em;
        margin-top: 3.5em
    }

    .desc{
        font: normal normal 600 1.1em Poppins;
        color: #212121;
        margin-bottom: 0;
    }

    .green{
        font: normal normal 300 .8em Poppins;
        color: #799283;
        margin-top: .5em;
        margin-bottom: 4em;
    }
`