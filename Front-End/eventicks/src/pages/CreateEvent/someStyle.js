import styled from "styled-components";

export const StyledButton = styled.button`
   color: white;
    background-color: #EE3869;
    border-radius: 20px;
    padding: 0.7% 1%;
    font-size: 1em;
    text-decoration: none;
    display: inline-block;
    border-color: transparent;
    margin-right: 2%;
    margin-top: 2%;

    &:active {
        background-color: #EA134D;
        text-decoration: none;
        color: white;
    }
`;

export const StyledInput = styled.input`
    padding: 0.5% 1%;
    width: 20%;
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
    padding: 0.5% 1%;
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
    padding: 0.5% 1%;
    width: 20%;
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
    padding: 0.6% 1%;
    width: 22.3%;
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
    margin: 1%;
    display: inline-block;
`;

export const SubTitle = styled.p`
    color: white;
    font-size: 1.2em;
`;

export const SubTitle1 = styled.p`
    color: white;
    font-size: 1em;
    display: inline-block;
`;

export const SubTitle2 = styled.p`
    color: white;
    font-size: 1em;
`;


export const MainContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    grid-auto-rows: minmax(100px, auto);
`;

export const FirstContainer = styled.div`
  grid-column: 1/3;
  grid-row: 1 / 3;
  background-color: #3B3C4E;
    padding: 3%;
    margin: 4%;
    border-radius: 30px;
    margin-bottom: -2%;
`;

export const SecondContainer = styled.div`
  grid-column: 2;
  grid-row: 2 / 7;
  margin-top: 124px;
  margin-bottom: -2%;
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

export const TitleContainer = styled.div`
    margin-top: -10px;
    
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
    top: 2%;
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

