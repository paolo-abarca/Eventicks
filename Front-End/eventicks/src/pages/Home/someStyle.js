import styled from "styled-components";

export const Title = styled.p`
    color: #EE3869;
    margin-top: -6%;
    margin-bottom: -1%;
    font-size: 4vw;
    margin-left: 6%;
    text-shadow:
    0 0 10px rgba(255,81,255,0.7),
    0 0 20px rgba(255,81,255,0.7);
`;

export const StyledButton = styled.button`
   color: white;
    background-color: #EE3869;
    border-radius: 20px;
    padding: 0.3% 1%;
    font-size: 1vw;
    text-decoration: none;
    display: inline-block;
    border-color: transparent;
    margin: 7px;

    &:active {
        background-color: #EA134D;
        text-decoration: none;
        color: white;
    }


`;

export const StyledSelect = styled.select`
    padding: 0.6% 1%;
    width: 10%;
    border-radius: 20px;
    border-style: none;
    margin: 1%;
    background: rgb(217, 217, 217, 0.6);
`;

export const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

`;

export const StyledInput = styled.input`
    padding: 0.5% 1%;
    width: 10%;
    border-radius: 20px;
    border-style: none;
    color: #130407;
    margin: 4px;
    background: rgb(217, 217, 217, 0.6);
    /* margin-left: 20px; */

    input[placeholder], [placeholder], *[placeholder] {
        color: #D9D9D9;
    }
`;

export const Div = styled.div``;

export const Lildiv = styled.div`
    background-color: #3B3C4E;
    padding: 2vw;
    margin: 5vw;
    border-radius: 30px;
    width: 100%;
`;

export const SubTitle = styled.p`
    color: #EE3869;
    font-size: 1.2em;
    font-weight: bold;
`;
