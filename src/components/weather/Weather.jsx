/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import * as s from "./StyledWeather";
import axios from "axios";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("Córdoba");
  const [playlistGenres, setPlaylistGenres] = useState("");
  const [spotifyPlaylist, setSpotifyPlaylist] = useState([]);
  const [spotifyLoading, setSpotifyLoading] = useState(false);
  const [spotifyError, setSpotifyError] = useState(null);

  useEffect(() => {
    if (!query) {
      setWeatherData(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const API_URL_BASE = import.meta.env.VITE_WEATHER_API_URL;

    const API_URL = `${API_URL_BASE}?key=${API_KEY}&q=${query}&days=14&aqi=no&lang=es`;

    axios
      .get(API_URL, { timeout: 5000 })
      .then((res) => {
        setWeatherData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [query]);

  useEffect(() => {
    if (weatherData && weatherData.current) {
      const currentTemp = weatherData.current.temp_c;
      let genres = "";

      if (currentTemp <= 15) {
        genres = "sad,melancholic,acoustic,slow";
      } else if (currentTemp > 15 && currentTemp <= 25) {
        genres = "indie,lo-fi,bossa-nova";
      } else if (currentTemp > 25) {
        genres = "reggaeton,trap,latin,urban";
      } else {
        genres = "electronic,chill";
      }

      setPlaylistGenres(genres);
    } else {
      setPlaylistGenres("");
    }
  }, [weatherData]);

  useEffect(() => {
    if (!playlistGenres || spotifyLoading) {
      setSpotifyPlaylist([]);
      return;
    }

    const fetchSpotifyRecommendations = async () => {
      setSpotifyLoading(true);
      setSpotifyError(null);
      setSpotifyPlaylist([]);

      const mainGenre = playlistGenres.split(",")[0] || "pop";

      const options = {
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/search/",
        params: {
          q: mainGenre,
          type: "tracks",
          limit: "10",
        },
        headers: {
          "x-rapidapi-key":
            "6d9bdcb4d5msh2da2a18c587299ap1a10f1jsndae292aeaebd",
          "x-rapidapi-host": "spotify23.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log("Spotify response:", response.data);

        const tracks = response?.data?.tracks?.items || [];
        setSpotifyPlaylist(tracks);
        console.log(spotifyPlaylist);
      } catch (err) {
        setSpotifyError(err);
      } finally {
        setSpotifyLoading(false);
      }
    };

    fetchSpotifyRecommendations();
  }, [playlistGenres]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") setQuery(searchTerm.trim());
  };

  const forecastDays = weatherData?.forecast?.forecastday
    ? weatherData.forecast.forecastday.slice(1)
    : [];

  return (
    <s.Main>
      <s.Form onSubmit={handleSearchSubmit}>
        <s.Input
          type="text"
          placeholder="Buscar ciudad..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <s.Button type="submit">Buscar</s.Button>
      </s.Form>

      {loading && <s.Message>Cargando clima...</s.Message>}

      {error && (
        <s.Message $isError>
          Error al cargar el clima: {error.message || "Ciudad no encontrada."}
        </s.Message>
      )}

      {weatherData && !loading && !error && (
        <>
          <s.WeatherContainer>
            <s.WeatherIcon
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
            />
            <s.WeatherDetails>
              <s.Heading>
                Clima en {weatherData.location.name},{" "}
                {weatherData.location.country}
              </s.Heading>
              <s.Paragraph>
                Temperatura: {weatherData.current.temp_c}°C
              </s.Paragraph>
              <s.Paragraph>
                Condición: {weatherData.current.condition.text}
              </s.Paragraph>
              <s.Paragraph>
                Humedad: {weatherData.current.humidity}%
              </s.Paragraph>
              <s.Paragraph>
                Sensación térmica: {weatherData.current.feelslike_c}°C
              </s.Paragraph>
            </s.WeatherDetails>
          </s.WeatherContainer>

          {forecastDays.length > 0 && (
            <s.ForecastContainer>
              {forecastDays.map((dayData) => (
                <s.ForecastCard key={dayData.date_epoch}>
                  <s.ForecastDate>
                    {new Date(dayData.date).toLocaleDateString("es-ES", {
                      weekday: "short",
                      day: "numeric",
                    })}
                  </s.ForecastDate>
                  <s.ForecastIcon
                    src={dayData.day.condition.icon}
                    alt={dayData.day.condition.text}
                  />
                  <s.ForecastTemp>
                    {dayData.day.maxtemp_c}° / {dayData.day.mintemp_c}°
                  </s.ForecastTemp>
                </s.ForecastCard>
              ))}
            </s.ForecastContainer>
          )}

          {spotifyLoading && <s.Message>Cargando canciones...</s.Message>}

          {spotifyError && (
            <s.Message $isError>
              Error al cargar canciones:{" "}
              {spotifyError.message || "Error desconocido."}
            </s.Message>
          )}

          {spotifyPlaylist.length > 0 && (
            <s.PlaylistContainer>
              <s.Heading>Canciones recomendadas</s.Heading>
              {spotifyPlaylist.map((track, index) => {
                const t = track.data;
                const artistNames = t.artists?.items
                  ? t.artists.items.map((a) => a.profile.name).join(", ")
                  : "Artista no disponible";
                const trackId = t.uri?.split(":")[2];
                const spotifyLink = trackId
                  ? `https://open.spotify.com/track/${trackId}`
                  : null;

                return (
                  <s.TrackCard key={t.id || index}>
                    <img
                      src={t.albumOfTrack?.coverArt?.sources?.[0]?.url || ""}
                      alt={t.name || "Canción"}
                      width={64}
                      height={64}
                      style={{ borderRadius: "8px" }}
                    />
                    <s.TrackInfo>
                      <s.TrackName>
                        {t.name || "Nombre no disponible"}
                      </s.TrackName>
                      <s.TrackArtist>{artistNames}</s.TrackArtist>
                      {spotifyLink ? (
                        <a
                          href={spotifyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Escuchar en Spotify
                        </a>
                      ) : (
                        <span>Link no disponible</span>
                      )}
                    </s.TrackInfo>
                  </s.TrackCard>
                );
              })}
            </s.PlaylistContainer>
          )}
        </>
      )}
      {!weatherData && !loading && !error && (
        <s.Message>Ingresa una ciudad para ver el clima.</s.Message>
      )}
    </s.Main>
  );
};
