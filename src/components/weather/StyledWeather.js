import styled, { keyframes } from "styled-components";
import { FaStepBackward, FaStepForward } from "react-icons/fa";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const floatSubtle = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
`;

const glowPulse = keyframes`
    0%, 100% { box-shadow: 0 0 10px rgba(135, 206, 250, 0.4); }
    50% { box-shadow: 0 0 20px rgba(135, 206, 250, 0.8); }
`;

export const Main = styled.main`
  min-height: 100vh;
  padding: 2.5rem 2rem;
  background: transparent;
  color: #e2e8f0;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2rem 1.2rem;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 700px;
  display: flex;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
  z-index: 10;
  animation: ${fadeIn} 1s ease-out forwards;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border-radius: 25px;
  border: 1px solid rgba(135, 206, 250, 0.3);
  background: rgba(25, 35, 55, 0.7);
  backdrop-filter: blur(12px);
  color: #e2e8f0;
  font-weight: 300;
  transition: all 0.4s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  &::placeholder {
    color: rgba(180, 220, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: #87ceeb;
    box-shadow: 0 0 0 3px rgba(135, 206, 250, 0.5),
      0 0 20px rgba(135, 206, 250, 0.7);
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.9rem 1.4rem;
  }
`;

export const Button = styled.button`
  padding: 0.9rem 2.2rem;
  background: linear-gradient(135deg, #4a69bd 0%, #6a8cd7 100%);
  color: white;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  animation: ${glowPulse} 3s infinite alternate;

  &:hover {
    background: linear-gradient(135deg, #6a8cd7 0%, #4a69bd 100%);
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    animation: none;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    padding: 0.8rem 0;
    font-size: 0.95rem;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1.2rem;
  }
`;

export const WeatherContainer = styled.section`
  width: 100%;
  background: rgba(25, 35, 55, 0.75);
  border-radius: 20px;
  padding: 2.2rem 2.8rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  user-select: none;
  border: 1px solid rgba(135, 206, 250, 0.3);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 1.2s ease-out forwards,
    ${floatSubtle} 6s ease-in-out infinite;

  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: -20px;
    width: 80px;
    height: 80px;
    background: radial-gradient(
      circle,
      rgba(135, 206, 250, 0.15) 0%,
      transparent 70%
    );
    border-radius: 50%;
    animation: ${glowPulse} 4s infinite alternate;
    z-index: -1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem 2.2rem;
    gap: 1.5rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 1.8rem 1.8rem;
    gap: 1.2rem;
  }
`;

export const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 6px 15px rgba(135, 206, 250, 0.7));
  animation: ${floatSubtle} 5s ease-in-out infinite reverse;

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

export const WeatherDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  color: #87ceeb;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  margin: 0.3rem 0;
  color: #c0d9ec;
  font-weight: 300;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin: 0.2rem 0;
  }
`;

export const ForecastContainer = styled.div`
  width: 100%;
  margin-bottom: 0;
  display: flex;
  gap: 0.6rem;
  padding: 5px;
  overflow-x: auto;
  padding-bottom: 1rem;
  z-index: 10;
  justify-content: flex-start;
  animation: ${fadeIn} 1.4s ease-out forwards;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(135, 206, 250, 0.1);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #87ceeb;
    border-radius: 8px;
    border: 2px solid rgba(25, 35, 55, 0.8);
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    padding-bottom: 0.8rem;
  }
`;

export const ForecastCard = styled.div`
  background: rgba(25, 35, 55, 0.6);
  border-radius: 15px;
  padding: 1.2rem 1.5rem;
  min-width: 120px;
  flex-shrink: 0;
  text-align: center;
  user-select: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(135, 206, 250, 0.15);
  animation: ${floatSubtle} 5s ease-in-out infinite;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(25, 35, 55, 0.8);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    border-color: rgba(135, 206, 250, 0.4);
  }

  &:nth-child(even) {
    animation-delay: 0.15s;
  }
  &:nth-child(odd) {
    animation-delay: 0.05s;
  }
  &:nth-child(3n) {
    animation-delay: 0.25s;
  }

  @media (max-width: 480px) {
    padding: 1rem 1.2rem;
    min-width: 100px;
  }
`;

export const ForecastDate = styled.p`
  font-weight: 400;
  color: #92b8ed;
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
  text-transform: capitalize;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const ForecastIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 0.6rem;
  filter: drop-shadow(0 4px 10px rgba(135, 206, 250, 0.6));

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    margin-bottom: 0.5rem;
  }
`;

export const ForecastTemp = styled.p`
  font-size: 1rem;
  color: #e2e8f0;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const Message = styled.p`
  font-size: 1.2rem;
  color: ${(props) => (props.$isError ? "#ff7f7f" : "#e2e8f0")};
  margin: 2.5rem 0;
  font-weight: 400;
  text-align: center;
  padding: 0 1rem;
  z-index: 10;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease-out forwards;

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin: 2rem 0;
  }
`;

export const PlaylistSection = styled.section`
  width: 100%;
  max-width: 480px;
  background: rgba(25, 35, 55, 0.75);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  margin-top: 1.5rem;
  border: 1px solid rgba(135, 206, 250, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1.6s ease-out forwards;

  &::before {
    content: "";
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    background: radial-gradient(
      circle,
      rgba(135, 206, 250, 0.15) 0%,
      transparent 70%
    );
    border-radius: 50%;
    animation: ${glowPulse} 4s infinite alternate reverse;
    z-index: -1;
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
    margin-top: 1.2rem;
    max-width: 95%;
  }
`;

export const PlaylistHeading = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  color: #87ceeb;
  text-align: center;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

export const PlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(60, 90, 120, 0.4);
  border-radius: 15px;
  padding: 1.5rem 1rem;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(135, 206, 250, 0.2);
  text-align: center;
  transition: all 0.3s ease;
  animation: ${floatSubtle} 6s ease-in-out infinite;

  @media (max-width: 480px) {
    padding: 1.2rem 0.8rem;
    max-width: 90%;
  }
`;

export const PlayerAlbumArt = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.15);
  animation: ${glowPulse} 3s infinite alternate;

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    margin-bottom: 0.8rem;
  }
`;

export const PlayerTrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const PlayerTrackName = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: #e2e8f0;
  margin-bottom: 0.3rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  word-break: break-word;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const PlayerTrackArtist = styled.span`
  font-size: 1rem;
  color: #a7d9f7;
  margin-bottom: 0.8rem;
  font-weight: 300;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const PlayerSpotifyLink = styled.a`
  display: inline-block;
  font-size: 0.9rem;
  color: #87ceeb;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease, transform 0.2s ease;
  padding: 0.4rem 0.8rem;
  border: 1px solid #87ceeb;
  border-radius: 20px;
  background: rgba(135, 206, 250, 0.1);

  &:hover {
    color: #d1efff;
    text-decoration: none;
    transform: translateY(-2px);
    background: rgba(135, 206, 250, 0.2);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
`;

export const PlayerControls = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const PlayerButton = styled.button`
  background: linear-gradient(135deg, #4a69bd 0%, #6a8cd7 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    background: linear-gradient(135deg, #6a8cd7 0%, #4a69bd 100%);
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: #4a69bd;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1.3rem;
  }
`;

export const PrevIcon = styled(FaStepBackward)`
  font-size: inherit;
`;

export const NextIcon = styled(FaStepForward)`
  font-size: inherit;
`;

export const LinkNotAvailable = styled.span`
  font-size: 0.75rem;
  color: #a0aec0;
  font-weight: 300;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;
