import React from 'react';
import { Title, Paragraph, StyledH2, StyledLi } from './someStyle.js';

const TermsAndConditions = () => {
  return (
    <div>
      <Title>Términos y condiciones de uso de Eventicks</Title>
      <Paragraph>Bienvenido a Eventicks. Estos son los términos y
         condiciones de uso que se aplican a su uso del
         sitio web y la aplicación móvil de Eventicks
         (en adelante "nuestro servicio"). Al utilizar
         nuestro servicio, usted acepta estos términos y
         condiciones. Por favor, lea cuidadosamente estos
         términos y condiciones antes de utilizar nuestro servicio.</Paragraph>

      <StyledH2>I Descripción del servicio</StyledH2>
      <Paragraph>Eventicks es una plataforma en línea que permite a
        los usuarios crear y publicar eventos, comprar y
        vender entradas para eventos, y administrar su
        participación en eventos. Eventicks no es el
        organizador de los eventos y no tiene control
        sobre el contenido de los eventos o la conducta
        de los organizadores o participantes.</Paragraph>


      <StyledH2>II Propiedad intelectual</StyledH2>
      <Paragraph>Todo el contenido de nuestro servicio, incluyendo
        el texto, gráficos, imágenes, logotipos, iconos de
        botones, software y otros materiales, son propiedad
        exclusiva de Eventicks o sus licenciantes.
        El uso no autorizado de cualquier contenido de
        nuestro servicio puede violar las leyes de propiedad intelectual.</Paragraph>

      <StyledH2>III Uso del servicio</StyledH2>
      <br></br>
      <br></br>
      <br></br>

      <StyledLi >Publicar contenido ilegal o inapropiado.</StyledLi >
      <StyledLi >Realizar actividades que interfieran o interrumpan nuestro servicio.</StyledLi >
      <StyledLi >Cometer fraude o engañar a otros usuarios.</StyledLi >
      <StyledLi >Violar la privacidad de otros usuarios.</StyledLi >
      <StyledLi >Usar nuestro servicio para cualquier actividad ilegal o fraudulenta.</StyledLi >

        <StyledH2>IV Registro de cuenta</StyledH2>
      <Paragraph>Para utilizar nuestro servicio, usted debe registrarse y crear una
        cuenta. Usted acepta proporcionar información precisa y completa al
        registrarse y actualizar su información de cuenta cuando sea necesario.
        Usted es responsable de mantener la seguridad de su cuenta y contraseña,
        y de cualquier actividad realizada a través de su cuenta.</Paragraph>

        <StyledH2>V Política de privacidad</StyledH2>
      <Paragraph>Eventicks se compromete a proteger su privacidad. Nuestra política
        de privacidad describe cómo recopilamos, utilizamos y compartimos
        su información personal en nuestro servicio. Al utilizar nuestro
        servicio, usted acepta nuestra política de privacidad.</Paragraph>

        <StyledH2>VI Responsabilidad</StyledH2>
      <Paragraph>Eventicks no se hace responsable de ningún contenido inapropiado
        o ilegal publicado en nuestro servicio. Usted es responsable de su uso
         de nuestro servicio y cualquier acción que realice en relación con
         nuestro servicio. Eventicks no se hace responsable de ninguna pérdida
          o daño que resulte del uso de nuestro servicio.</Paragraph>

          <StyledH2>VII Ley aplicable</StyledH2>
      <Paragraph>Estos términos y condiciones se rigen por las leyes de Perú.
        Cualquier disputa relacionada con el uso de nuestro servicio
        se resolverá mediante un arbitraje vinculante de conformidad con las leyes de Perú.</Paragraph>

        <Paragraph>Al utilizar nuestro servicio, usted acepta estos términos
          y condiciones en su totalidad. Si no está de acuerdo con
          estos términos y condiciones, no utilice nuestro servicio.
          Eventicks se reserva el derecho de modificar estos términos
          y condiciones en cualquier momento. Es su responsabilidad
          revisar estos términos y condiciones regularmente para
          asegurarse de que está al tanto de cualquier cambio.</Paragraph>
    </div>
  );
};

export default TermsAndConditions;