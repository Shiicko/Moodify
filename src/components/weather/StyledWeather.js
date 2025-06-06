import styled from "styled-components";

export const Main = styled.main`
  min-height: 100vh;
  padding: 2rem 2.5rem;
  background: linear-gradient(135deg, #0f182a 0%, #1c263f 100%);
  color: #e0e7f1;
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 1.5rem 1.5rem;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 700px;
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.9rem 1.2rem;
  font-size: 1.1rem;
  border-radius: 12px;
  border: 1.5px solid #3a4a6a;
  background: #1f2b49;
  color: #dbe7f1;
  font-weight: 500;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #7a7a8c;
  }

  &:focus {
    border-color: #61dafb;
    outline: none;
    box-shadow: 0 0 6px #61dafb88;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.8rem 1rem;
  }
`;

export const Button = styled.button`
  padding: 0 1.8rem;
  background: #61dafb;
  color: #0f182a;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.15s ease;

  &:hover {
    background: #52c7ea;
    transform: scale(1.04);
  }

  &:active {
    background: #3ea8d6;
    transform: scale(0.96);
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0;
    font-size: 0.95rem;
  }
`;

export const WeatherContainer = styled.section`
  width: 100%;
  max-width: 700px;
  background: rgba(31, 45, 77, 0.85);
  border-radius: 16px;
  padding: 1.8rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 6px 18px rgba(97, 218, 251, 0.45);
  user-select: none;

  @media (max-width: 480px) {
    flex-direction: column;
    padding: 1.4rem 1.6rem;
    gap: 1rem;
  }
`;

export const WeatherIcon = styled.img`
  width: 90px;
  height: 90px;
  filter: drop-shadow(0 4px 9px rgba(97, 218, 251, 0.65));
  animation: float 3.5s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
  }
`;

export const WeatherDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  @media (max-width: 480px) {
    align-items: center;
    text-align: center;
  }
`;

export const Heading = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #61dafb;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 1.1rem;
  margin: 0.3rem 0;
  color: #c3d1e5;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ForecastContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin-top: 2.5rem;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    height: 7px;
  }
  &::-webkit-scrollbar-track {
    background: #121a2c;
  }
  &::-webkit-scrollbar-thumb {
    background: #61dafb;
    border-radius: 5px;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-top: 2rem;
  }
`;

export const ForecastCard = styled.div`
  background: rgba(37, 59, 99, 0.9);
  border-radius: 14px;
  padding: 1.2rem 1.4rem;
  min-width: 130px;
  flex-shrink: 0;
  text-align: center;
  user-select: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-6px);
  }

  @media (max-width: 480px) {
    padding: 1rem 1.2rem;
    min-width: 110px;
  }
`;

export const ForecastDate = styled.p`
  font-weight: 600;
  color: #61dafb;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-transform: capitalize;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ForecastIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 2px 6px rgba(97, 218, 251, 0.75));

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-bottom: 0.4rem;
  }
`;

export const ForecastTemp = styled.p`
  font-size: 1rem;
  color: #d6e2f0;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const Message = styled.p`
  font-size: 1.15rem;
  color: ${(props) => (props.$isError ? "#ff6b6b" : "#d6e2f0")};
  margin: 2rem 0;
  font-weight: 600;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 1.5rem 0;
  }
`;
export const PlaylistContainer = styled.div`
  margin-top: 2rem;
`;

export const TrackCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const TrackInfo = styled.div`
  margin-left: 1rem;
`;

export const TrackName = styled.div`
  font-weight: bold;
`;

export const TrackArtist = styled.div`
  font-size: 0.9rem;
  color: #666;
`;
