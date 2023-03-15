import styled from "styled-components";

export const StyledButton = styled.button`
   color: white;
    background-color: #EE3869;
    border-radius: 20px;
    padding: 1% 2%;
    font-size: 1em;
    text-decoration: none;
    display: inline-block;
    border-color: transparent;
    margin-right: 2%;
    margin-top: 2%;
    margin-left: 1%;

    &:active {
        background-color: #EA134D;
        text-decoration: none;
        color: white;
    }
`;

export const StyledInput = styled.input`
    padding: 1.5% 2%;
    width: 20%;
    width: auto;
    border-radius: 20px;
    border-style: none;
    color: #130407;
    margin: 4px;
    background: #9A9AA1;

    ::placeholder {
    color: #130407; /* Cambia el color del placeholder a rojo */
  }
`;

export const StyledInput1 = styled.input`
    padding: 2% 3%;
    width: 20%;
    border-radius: 20px;
    border-style: none;
    color: #130407;
    margin: 4px;
    background: #9A9AA1;
    /* margin-left: 20px; */

    ::placeholder {
    color: #130407; /* Cambia el color del placeholder a rojo */
  }
`;

export const StyledTextArea = styled.textarea`
    padding: 2% 3%;
    width: auto;
    height: auto;
    border-radius: 20px;
    border-style: none;
    color: #130407;
    margin: 4px;
    background: rgb(217, 217, 217, 0.6);
    /* margin-left: 20px; */

    ::placeholder {
    color: #130407; /* Cambia el color del placeholder a rojo */
  }
`;

export const StyledSelect = styled.select`
    padding: 2% 2%;
    width: auto;
    border-radius: 20px;
    border-style: none;
    background: rgb(217, 217, 217, 0.6);
    ::placeholder {
    color: #130407; /* Cambia el color del placeholder a rojo */
  }
`;

export const Title = styled.p`
    color: #EE3869;
    font-size: 3em;
    margin: 7% 6% -3% 5% ;
    text-shadow:
    0 0 20px rgba(255,81,255,0.7);
`;

export const SubTitle = styled.p`
    color: #EE3869;
    font-size: 1.2em;
    font-weight: bold;
`;

export const SubTitle1 = styled.p`
    color: white;
    font-size: 1em;
    margin-left: 1%;
    margin: 0;
    display: inline-block;
`;

export const SubTitle2 = styled.p`
    color: #EE3869;
    font-size: 1.2em;
    font-weight: bold;
    margin: 7% 6% -3% 5% ;
`;

export const ThirdContainer = styled.div`
  grid-column: 1/5;
  grid-row: 3;
  background-color: #3B3C4E;
    padding: 2%;
    margin: 4%;
    border-radius: 30px;
    margin-bottom: -2%;
`;

export const FourthContainer = styled.div`
    grid-column: 1/5;
    grid-row: 4;
    background-color: #3B3C4E;
    padding: 2%;
    margin: 4%;
    border-radius: 30px;
    margin-bottom: -12%;
`;


export const BeautyContainer = styled.div`
    margin: 3%;
    margin-top: -1%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Number = styled.button`
    background-color: #EE3869;
    border: 0ch;
    color: white;
    border-radius: 15px;
    font-size: 2em;
    width: 4%;
    height: 1%;
    display: inline-block;
    margin-right: 2%;
`;

export const FinalButton = styled.button`
  color: white;
  background-color: #EE3869;
  border-radius: 20px;
  padding: 1% 2%;
  font-size: 1.4em;
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

export const TitleT = styled.p`
    color: #EE3869;
    font-size: 2em;
    display: inline-block;
    margin: 0;
`;

export const MainContainer = styled.p`
        background-color: #3B3C4E;
        padding: 3%;
        margin: 5%;
        border-radius: 30px;
        padding-bottom: 32%;
`;

export const MainContainer1 = styled.p`
        background-color: #3B3C4E;
        padding: 3%;
        margin: 5%;
        border-radius: 30px;
        padding-bottom: 20%;
`;


export const FirstContainer = styled.div`
    width: 60%;
    float: left;
    

`;

export const SecondContainer = styled.div`
    width: 40%;
    float: right;
`;

export const TitleContainer = styled.p`

`;

export const Img = styled.img`
border-radius: 100%;
`;

export const Lildiv = styled.div`
    background-color: #3B3C4E;
    padding: 2vw;
    margin: 5vw;
    border-radius: 30px;
`;

export const SubTitle4 = styled.p`
    margin-left: 9px;
    display: inline-block;
`;