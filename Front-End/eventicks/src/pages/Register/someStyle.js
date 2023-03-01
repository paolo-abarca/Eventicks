import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginContainer = styled.div`
    text-align: center;
    width: 100%;
    height: 79%;
    padding-top: 5%;
    position: absolute;
    background: linear-gradient(180deg, rgba(32,35,50,1) 1%, rgba(73,61,73,1) 40%, rgba(105,93,95,1) 120%);
`;

export const Title = styled.p`
    @import url('https://fonts.googleapis.com/css2?family=Asap:wght@100&display=swap');
    font-style: normal;
    color: white;
    margin-bottom: 3%;
    margin-top: -2%;
    font-size: 3em;
    font-weight: lighter;
`;

export const BeautyContainer = styled.div`
    height: 15px;
`;


export const StyledButton = styled.button`
    color: white;
    background-color: #EE3869;
    border-radius: 20px;
    padding: 0.8% 8%;
    font-size: 1em;
    text-decoration: none;
    display: inline-block;
    border-color: transparent;

    &:active {
        background-color: #EA134D;
        text-decoration: none;
        color: white;
    }
`;

export const StyledLink = styled(Link)`
    color: #EE3869;
    text-decoration: none;
    font-size: 1.1em;
`;

export const Input = styled.input`
    padding: 0.9% 1%;
    width: 22%;
    border-radius: 20px;
    border-style: none;
    background: rgb(217, 217, 217, 0.6);
    margin: 10px;
`;

export const MainContainer = styled.div`
     display: flex;
`;

export const Select = styled.select`
    padding: 0.9% 2%;
    width: 24%;
    border-radius: 20px;
    border-style: none;
    margin: 0.5%;
    background: rgb(217, 217, 217, 0.6);
`;