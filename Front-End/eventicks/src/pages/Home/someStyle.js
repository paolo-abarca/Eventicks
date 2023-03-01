import styled from "styled-components";

export const Title = styled.p`
    color: #EE3869;
    margin-bottom: 3%;
    font-size: 3em;
    text-align: center;
    text-shadow:
    0 0 10px rgba(255,81,255,0.7),
    0 0 20px rgba(255,81,255,0.7);
`;

export const StyledButton = styled.button`
   color: white;
    background-color: #EE3869;
    border-radius: 20px;
    padding: 0.3% 1%;
    font-size: 1em;
    text-decoration: none;
    display: inline-block;
    border-color: transparent;
    margin: 3px;

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

