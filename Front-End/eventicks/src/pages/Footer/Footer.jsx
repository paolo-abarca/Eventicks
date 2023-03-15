import React from 'react';
import {FooterContainer} from './someStyle.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <FooterContainer>
      <p>Síguenos en:</p>
      <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} /></a>
      <a href="https://www.twitter.com/"><FontAwesomeIcon icon={faTwitter} /></a>
      <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} /></a>
      <a href="https://www.linkedin.com/"><FontAwesomeIcon icon={faLinkedin} /></a>
    </FooterContainer>
  );
}
