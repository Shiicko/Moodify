/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import * as s from "./StyledWeather";
import axios from "axios";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("Ushuaia");
  const [playlistGenres, setPlaylistGenres] = useState("");
  const [spotifyPlaylist, setSpotifyPlaylist] = useState([]);
  const [spotifyLoading, setSpotifyLoading] = useState(false);
  const [spotifyError, setSpotifyError] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const isInitialMount = useRef(true);

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
      const weatherCondition = weatherData.current.condition.text.toLowerCase();
      let genres = "";
      let moodTerm = "";

      if (currentTemp <= 15) {
        genres = "rock,pop,hip hop,r&b"; // Géneros populares para el frío
        moodTerm = "sad";
      } else if (currentTemp > 15 && currentTemp <= 25) {
        genres = "reggaeton,latin pop,pop,dance"; // Géneros populares para el templado
        moodTerm = "upbeat";
      } else if (currentTemp > 25) {
        genres = "cumbia,salsa,reggae,latin urban"; // Géneros populares para el calor
        moodTerm = "energetic";
      } else {
        genres = "electronic,indie,alternative,ambient"; // Géneros por defecto si no hay match claro
        moodTerm = "relaxing";
      }

      if (weatherCondition.includes("lluvia")) {
        moodTerm = "rainy";
        genres = "jazz,blues,lo-fi,soul"; // Géneros para la lluvia
      } else if (
        weatherCondition.includes("soleado") ||
        weatherCondition.includes("despejado")
      ) {
        moodTerm = "sunny";
        genres = "pop,reggaeton,trap,hip hop"; // Géneros para el sol
      } else if (weatherCondition.includes("nublado")) {
        moodTerm = "chill";
        genres = "acoustic,folk,indie pop,soft rock"; // Géneros para el nublado
      }

      setPlaylistGenres(genres);
    } else {
      setPlaylistGenres("");
    }
  }, [weatherData]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!playlistGenres) {
      setSpotifyPlaylist([]);
      return;
    }

    const fetchSpotifyRecommendations = async () => {
      setSpotifyLoading(true);
      setSpotifyError(null);
      setSpotifyPlaylist([]);
      setCurrentSongIndex(0);

      const genresArray = playlistGenres.split(",");
      const exampleArtistsByGenre = {
        rock: ["Queen", "Led Zeppelin", "Soda Stereo", "Metallica", "AC/DC"],
        pop: [
          "Taylor Swift",
          "Bad Bunny",
          "Billie Eilish",
          "Dua Lipa",
          "Harry Styles",
        ],
        "hip hop": [
          "Drake",
          "Kendrick Lamar",
          "Eminem",
          "Travis Scott",
          "J. Cole",
        ],
        "r&b": ["Beyoncé", "The Weeknd", "Rihanna", "Usher", "SZA"],
        reggaeton: [
          "Daddy Yankee",
          "J Balvin",
          "Bad Bunny",
          "Karol G",
          "Ozuna",
        ],
        "latin pop": [
          "Shakira",
          "Ricky Martin",
          "Luis Fonsi",
          "Maluma",
          "Camilo",
        ],
        trap: [
          "Anuel AA",
          "Bad Bunny",
          "Travis Scott",
          "Future",
          "Lil Uzi Vert",
        ],
        dance: [
          "David Guetta",
          "Calvin Harris",
          "Tiësto",
          "Avicii",
          "Marshmello",
        ],
        cumbia: [
          "Los Palmeras",
          "Gilda",
          "Damas Gratis",
          "Amar Azul",
          "La Delio Valdez",
        ],
        salsa: [
          "Marc Anthony",
          "Rubén Blades",
          "Celia Cruz",
          "Héctor Lavoe",
          "Willie Colón",
        ],
        reggae: [
          "Bob Marley",
          "Peter Tosh",
          "UB40",
          "Damian Marley",
          "Protoje",
        ],
        "latin urban": [
          "Bad Bunny",
          "Rauw Alejandro",
          "Myke Towers",
          "Sech",
          "Nicky Jam",
        ],
        electronic: [
          "Daft Punk",
          "Skrillex",
          "The Chemical Brothers",
          "Deadmau5",
          "Disclosure",
        ],
        indie: [
          "Arctic Monkeys",
          "The Strokes",
          "Vance Joy",
          "Florence + The Machine",
          "Tame Impala",
        ],
        alternative: [
          "Nirvana",
          "Radiohead",
          "Red Hot Chili Peppers",
          "Linkin Park",
          "Green Day",
        ],
        ambient: [
          "Brian Eno",
          "Aphex Twin",
          "Sigur Rós",
          "Tycho",
          "Boards of Canada",
        ],
        jazz: [
          "Miles Davis",
          "Louis Armstrong",
          "John Coltrane",
          "Ella Fitzgerald",
          "Frank Sinatra",
        ],
        blues: [
          "B.B. King",
          "Muddy Waters",
          "Eric Clapton",
          "John Lee Hooker",
          "Stevie Ray Vaughan",
        ],
        "lo-fi": ["Jinsang", "Idealism", "potsu", "Ehrling", "Nujabes"],
        soul: [
          "Aretha Franklin",
          "Stevie Wonder",
          "Marvin Gaye",
          "Bill Withers",
          "Sam Cooke",
        ],
        acoustic: [
          "Ed Sheeran",
          "Jack Johnson",
          "Damien Rice",
          "Bon Iver",
          "Passenger",
        ],
        folk: [
          "Bob Dylan",
          "Joni Mitchell",
          "Simon & Garfunkel",
          "Mumford & Sons",
          "The Lumineers",
        ],
        "indie pop": [
          "The 1975",
          "Lorde",
          "Lana Del Rey",
          "Halsey",
          "Imagine Dragons",
        ],
        "soft rock": [
          "Fleetwood Mac",
          "Eagles",
          "Billy Joel",
          "Elton John",
          "Phil Collins",
        ],
      };

      const searchQueries = [];
      const MAX_QUERIES_PER_GENRE = 2; // Para evitar demasiadas consultas por género

      genresArray.slice(0, 3).forEach((genre) => {
        // Seleccionamos hasta 3 géneros principales
        // Primero, intentamos buscar canciones populares del género
        searchQueries.push(`${genre} songs`);

        // Luego, si tenemos artistas de ejemplo para el género, elegimos uno al azar y buscamos sus canciones
        if (
          exampleArtistsByGenre[genre] &&
          exampleArtistsByGenre[genre].length > 0
        ) {
          const randomArtist =
            exampleArtistsByGenre[genre][
              Math.floor(Math.random() * exampleArtistsByGenre[genre].length)
            ];
          searchQueries.push(`${randomArtist} songs`);
        }
      });

      // Si la cantidad de queries es baja, añadimos una búsqueda más general para asegurar resultados
      if (searchQueries.length < 3) {
        searchQueries.push("top global songs");
      }

      const combinedQuery = searchQueries.join(" OR "); // Usamos OR para ampliar los resultados

      const options = {
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/search/",
        params: {
          q: combinedQuery,
          type: "tracks",
          limit: "30",
        },
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_SPOTIFY_API_KEY,
          "x-rapidapi-host": "spotify23.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const tracks = response?.data?.tracks?.items || [];
        setSpotifyPlaylist(tracks);
      } catch (err) {
        setSpotifyError(err);
      } finally {
        setSpotifyLoading(false);
      }
    };

    fetchSpotifyRecommendations();
  }, [playlistGenres, weatherData]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") setQuery(searchTerm.trim());
  };

  const goToNextSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex + 1) % spotifyPlaylist.length
    );
  };

  const goToPreviousSong = () => {
    setCurrentSongIndex(
      (prevIndex) =>
        (prevIndex - 1 + spotifyPlaylist.length) % spotifyPlaylist.length
    );
  };

  const forecastDays = weatherData?.forecast?.forecastday
    ? weatherData.forecast.forecastday.slice(1, 4)
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

      {loading && <s.Message>Cargando clima bajo las estrellas...</s.Message>}

      {error && (
        <s.Message $isError>
          Error cósmico al cargar el clima:{" "}
          {error.message || "Ciudad no encontrada en las constelaciones."}
        </s.Message>
      )}

      {weatherData && !loading && !error && (
        <s.ContentWrapper>
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

          {spotifyLoading && (
            <s.Message>Buscando melodías entre las estrellas...</s.Message>
          )}

          {spotifyError && (
            <s.Message $isError>
              Las ondas sonoras se perdieron en el cosmos:{" "}
              {spotifyError.message ||
                "Error desconocido en la nebulosa musical."}
            </s.Message>
          )}

          {spotifyPlaylist.length > 0 && (
            <s.PlaylistSection>
              <s.PlaylistHeading>
                Tu banda sonora galáctica 🎵
              </s.PlaylistHeading>
              <s.PlayerCard>
                {(() => {
                  const track = spotifyPlaylist[currentSongIndex];
                  const t = track.data;
                  const artistNames = t.artists?.items
                    ? t.artists.items.map((a) => a.profile.name).join(", ")
                    : "Artista celestial desconocido";
                  const trackId = t.uri?.split(":")[2];
                  const spotifyLink = trackId
                    ? `https://open.spotify.com/track/${trackId}`
                    : null;

                  return (
                    <>
                      <s.PlayerAlbumArt
                        src={
                          t.albumOfTrack?.coverArt?.sources?.[0]?.url ||
                          "https://via.placeholder.com/180/303841/e0f2f7?text=Álbum"
                        }
                        alt={t.name || "Melodía"}
                      />
                      <s.PlayerTrackInfo>
                        <s.PlayerTrackName>
                          {t.name || "Título interestelar no disponible"}
                        </s.PlayerTrackName>
                        <s.PlayerTrackArtist>{artistNames}</s.PlayerTrackArtist>
                        {spotifyLink ? (
                          <s.PlayerSpotifyLink
                            href={spotifyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Abrir en Spotify
                          </s.PlayerSpotifyLink>
                        ) : (
                          <s.LinkNotAvailable>
                            Enlace de Spotify no disponible
                          </s.LinkNotAvailable>
                        )}
                      </s.PlayerTrackInfo>
                    </>
                  );
                })()}
                <s.PlayerControls>
                  <s.PlayerButton
                    onClick={goToPreviousSong}
                    disabled={spotifyPlaylist.length <= 1}
                  >
                    <s.PrevIcon />
                  </s.PlayerButton>
                  <s.PlayerButton
                    onClick={goToNextSong}
                    disabled={spotifyPlaylist.length <= 1}
                  >
                    <s.NextIcon />
                  </s.PlayerButton>
                </s.PlayerControls>
              </s.PlayerCard>
            </s.PlaylistSection>
          )}
        </s.ContentWrapper>
      )}
      {!weatherData && !loading && !error && (
        <s.Message>Observa las estrellas e ingresa una ciudad.</s.Message>
      )}
    </s.Main>
  );
};
