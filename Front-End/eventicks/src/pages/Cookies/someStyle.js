import styled, { keyframes } from 'styled-components';

export const CookieNoticeContainer = styled.div`
  position: fixed;
  color: white;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: black;
  padding: 20px;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  button {
    margin: 0 10px  ;
  }
`;

export const AceptarButton = styled.button`
background-color: green;
border-radius: 5px;
padding: 10px 20px;
border: none;
cursor: pointer;
margin-top: -10px;
transition: all 0.2s ease-in-out;

&:hover {
  background-color: #00cc00;
  color: #ffffff;
  transform: scale(1.1);

}
`;

export const RechazarButton = styled.button`
background-color: red;
color: white;
border-radius: 5px;
padding: 9px 17px;
border: none;
cursor: pointer;
margin-top: -10px;
transition: all 0.2s ease-in-out;


&:hover {
  background-color: #ff5a5a;
  color: #ffffff;
  transform: scale(1.1);
}
`;

const rainbow = keyframes`
  0% {
    background-position-x: 400%;
  }
  100% {
    background-position-x: 0%;
  }
`;

// Creamos un componente estilizado con un estilo que hace uso del keyframe anterior para crear el efecto de colores arcoíris
export const RainbowText = styled.span`
  background: linear-gradient(to right, orange, yellow, purple, green, white, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400% auto;
  animation: ${rainbow} 20s linear infinite;
`;