import styled from 'styled-components';


export const FooterContainer = styled.div`
background-color: #161722;
padding: 2rem;
position: absolute;
text-align: center;
width: 100%;
bottom: 1;
right: 0;

p {
  color: #ffffff;
  margin-bottom: 1rem;
}

a {
  margin-left: 1rem;
  display: inline-block;
  position: relative;
  color: #ffffff;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    color: #161722;
  }

  &:hover:before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background-color: #EE3869;
    z-index: -1;
    border-radius: 5px;
    transform: scale(0.9);
    transition: all 0.2s ease-in-out;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
}
`;
