import * as S from "./FooterStyled";

export const Footer = () => {
  return (
    <S.FooterContainer>
      <S.SocialLinks>
        <S.SocialIconLink
          href="https://www.linkedin.com/in/brian-elias-perfil/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <S.LinkedInIcon />
        </S.SocialIconLink>
        <S.SocialIconLink
          href="https://portfolio-joels-projects-13676556.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio"
        >
          <S.PortfolioIcon />
        </S.SocialIconLink>
        <S.SocialIconLink
          href="https://open.spotify.com/album/3RQQmkQEvNCY4prGKE6oc5"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <S.GithubIcon />
        </S.SocialIconLink>
      </S.SocialLinks>
      <S.CopyrightText>
        © {new Date().getFullYear()} Brian Elias. Todos los derechos reservados.
      </S.CopyrightText>
    </S.FooterContainer>
  );
};
