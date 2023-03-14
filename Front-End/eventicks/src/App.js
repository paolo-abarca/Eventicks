import styled from "styled-components";
import { Link } from "react-router-dom";

export const Navbar = styled.nav`
  width: 100%;
  height: 11%;
  background-color: #1D1E2C;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0em;
  z-index: 1;
  transition: top 0.3s;
`;


export const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  padding-left: 5%;
  padding-top: 0.7%;
`;

export const NavbarLink = styled(Link)`
  color: white;
  font-size: 1.2em;
  font-weight: lighter;
  text-decoration: none;
  margin: 10px;
  @media (max-width: 700px) {
    display: none;
  }

  margin-left: 40px;

`;

export const LogoA = styled.img`
  margin: 2px;
  max-width: 200px;
  height: auto;
  float: left;
`;

export const LoginA = styled(Link)`
  color: white;
  font-size: 1em;
  font-weight: lighter;
  text-decoration: none;
  margin: 10px;

`;

export const BeautyContainer = styled.div`
    width: 65%;
`;

export const LoginContainer = styled.div`
    width: auto;
    height: 40px;
    background-color: #EE3869;
    border-radius: 50px;
    display: flex;
`;

export const MainContainer = styled.div`
  flex: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 5%;
  margin-top: -3%;
  float: right;
`;

export const UltimateContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const Footer = styled.div`
  background-color: aliceblue;
  width: 20%;
`;
