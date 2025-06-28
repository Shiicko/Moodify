import styled from "styled-components";
import { FaLinkedin, FaSpotify, FaLaptop } from "react-icons/fa";

export const FooterContainer = styled.footer`
  width: 100%;
  color: #61dafb;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 25px;
`;

export const SocialIconLink = styled.a`
  color: #61dafb;
  font-size: 30px;
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    color: #e0f2f7;
    transform: translateY(-5px);
  }
`;

export const LinkedInIcon = styled(FaLinkedin)``;
export const GithubIcon = styled(FaSpotify)``;
export const PortfolioIcon = styled(FaLaptop)``;

export const CopyrightText = styled.p`
  font-size: 0.9rem;
  color: #aaa;
  margin-top: 10px;
`;
