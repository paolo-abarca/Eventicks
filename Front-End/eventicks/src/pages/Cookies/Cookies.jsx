import { useState, useEffect } from 'react';
import { CookieNoticeContainer, ButtonContainer, AceptarButton, RechazarButton, RainbowText  } from './someStyle.js';

const CookieNotice = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(false);

  const handleAcceptCookies = () => {
    setAcceptedCookies(true);
    localStorage.setItem('accepted-cookies', true);
  };

  const handleRejectCookies = () => {
    setAcceptedCookies(false);
    localStorage.setItem('accepted-cookies', false);
  };

  useEffect(() => {
    const isAccepted = localStorage.getItem('accepted-cookies') === 'true';
    setAcceptedCookies(isAccepted);
  }, []);

  return (
    !acceptedCookies && (
      <CookieNoticeContainer>
     <RainbowText>
        Este sitio web utiliza cookies para mejorar tu experiencia de usuario y ofrecerte contenido personalizado.
      </RainbowText>
      <p>
      </p>

        <ButtonContainer>
          <AceptarButton onClick={handleAcceptCookies}>Aceptar</AceptarButton>
          <RechazarButton onClick={handleRejectCookies}>Rechazar</RechazarButton>
        </ButtonContainer>
      </CookieNoticeContainer>
    )
  );
};

export default CookieNotice;