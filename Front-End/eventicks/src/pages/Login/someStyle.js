import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginContainer = styled.div`
    text-align: center;
    width: 100%;
    height: 78.7%;
    padding-top: 5%;
    position: absolute;
    background: linear-gradient(180deg, rgba(32,35,50,1) 1%, rgba(73,61,73,1) 40%, rgba(105,93,95,1) 120%);
`;

export const Title = styled.p`
    font-style: normal;
    color: white;
    margin-bottom: 3%;
    font-size: 3em;
    font-weight: lighter;
    margin-top: -0.1%;
    padding-top: 2%;
`;

export const BeautyContainer = styled.div`
    height: 20px;
`;

export const Acount = styled.p`
    font-size: 0.8em;
    color: white;
`;

export const StyledButton = styled.button`
    color: white;
    background-color: #EE3869;
    border-radius: 20px;
    padding: 0.8% 9%;
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
    color: #130407;
    background: rgb(217, 217, 217, 0.6);
    /* margin-left: 20px; */

    input[placeholder], [placeholder], *[placeholder] {
        color: #D9D9D9;
    }
`;