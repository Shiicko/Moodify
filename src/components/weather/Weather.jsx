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

      if (weatherData && weatherData.current) {
        const currentTemp = weatherData.current.temp_c;
        const weatherCondition =
          weatherData.current.condition.text.toLowerCase();
        let genres = "";
        let moodTerm = "";

        if (currentTemp <= 10) {
          genres = "soft rock,acoustic,folk,ambient,jazz,blues,lo-fi,soul";
          moodTerm = "melancholic";
        } else if (currentTemp > 10 && currentTemp <= 20) {
          genres = "rock,indie,alternative,pop,r&b,acoustic,folk";
          moodTerm = "chill";
        } else if (currentTemp > 20 && currentTemp <= 28) {
          genres = "pop,reggaeton,latin pop,dance,hip hop,latin urban";
          moodTerm = "upbeat";
        } else if (currentTemp > 28) {
          genres = "cumbia,salsa,reggae,latin urban,reggaeton,dance";
          moodTerm = "energetic";
        } else {
          genres = "electronic,indie,alternative,ambient";
          moodTerm = "relaxing";
        }

        if (
          weatherCondition.includes("lluvia") ||
          weatherCondition.includes("llovizna")
        ) {
          moodTerm = "rainy";
          genres = "jazz,blues,lo-fi,soul,acoustic,ambient";
        } else if (
          weatherCondition.includes("soleado") ||
          weatherCondition.includes("despejado")
        ) {
          moodTerm = "sunny";
          genres = `pop,reggaeton,trap,hip hop,${genres}`;
        } else if (weatherCondition.includes("nublado")) {
          moodTerm = "chill";
          genres = "acoustic,folk,indie pop,soft rock,ambient,jazz";
        } else if (
          weatherCondition.includes("niebla") ||
          weatherCondition.includes("neblina")
        ) {
          moodTerm = "mysterious";
          genres = "ambient,classical,instrumental,jazz";
        } else if (weatherCondition.includes("nieve")) {
          moodTerm = "cozy";
          genres = "classical,jazz,folk,acoustic";
        }

        setPlaylistGenres(genres);
      } else {
        setPlaylistGenres("");
      }
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
        rock: [
          "Queen",
          "Led Zeppelin",
          "Soda Stereo",
          "Metallica",
          "AC/DC",
          "Enanitos Verdes",
          "Gustavo Cerati",
          "Charly García",
          "Luis Alberto Spinetta",
          "Divididos",
          "La Renga",
          "Patricio Rey y sus Redonditos de Ricota",
          "Spinettalandia y Sus Amigos",
          "Pescado Rabioso",
        ],
        pop: [
          "Taylor Swift",
          "Dua Lipa",
          "Harry Styles",
          "Michael Jackson",
          "Madonna",
          "Luis Miguel",
          "Ricardo Arjona",
          "Adele",
          "Ed Sheeran",
          "Jesse & Joy",
          "Julieta Venegas",
          "Silvio Rodríguez",
          "Fito Páez",
        ],
        "hip hop": [
          "Drake",
          "Kendrick Lamar",
          "Eminem",
          "Cypress Hill",
          "Beastie Boys",
          "Wu-Tang Clan",
          "Nas",
          "Dr. Dre",
          "Calle 13",
          "Kase.O",
        ],
        "r&b": [
          "Beyoncé",
          "The Weeknd",
          "Rihanna",
          "Usher",
          "SZA",
          "Marvin Gaye",
          "Aretha Franklin",
          "Stevie Wonder",
          "Alicia Keys",
          "D'Angelo",
          "Erykah Badu",
        ],
        reggaeton: [
          "Daddy Yankee",
          "J Balvin",
          "Bad Bunny",
          "Karol G",
          "Ozuna",
          "Don Omar",
          "Tego Calderón",
          "Maluma",
          "Shakira",
          "Wisin & Yandel",
          "Zion & Lennox",
        ],
        "latin pop": [
          "Shakira",
          "Ricky Martin",
          "Luis Fonsi",
          "Camilo",
          "Alejandro Sanz",
          "Marc Anthony",
          "Gloria Estefan",
          "Chayanne",
          "Juanes",
          "Mon Laferte",
          "Natalia Lafourcade",
        ],
        trap: [
          "Duki",
          "C. Tangana",
          "Paulo Londra",
          "Nicki Nicole",
          "Trueno",
          "Bizarrap",
          "Wos",
        ],
        dance: [
          "David Guetta",
          "Calvin Harris",
          "Tiësto",
          "Avicii",
          "Marshmello",
          "Fatboy Slim",
          "The Chemical Brothers",
          "Disclosure",
          "Kygo",
          "Purple Disco Machine",
          "Fred again..",
        ],
        cumbia: [
          "Los Palmeras",
          "Gilda",
          "Damas Gratis",
          "Amar Azul",
          "La Delio Valdez",
          "Los Auténticos Decadentes",
          "Sonora Dinamita",
          "Leo Mattioli",
          "Antonio Ríos",
          "Santaferia",
          "El Polaco",
        ],
        salsa: [
          "Marc Anthony",
          "Rubén Blades",
          "Celia Cruz",
          "Héctor Lavoe",
          "Willie Colón",
          "Frankie Ruiz",
          "Fania All-Stars",
          "Gilberto Santa Rosa",
          "Víctor Manuelle",
          "La India",
          "Ismael Rivera",
        ],
        reggae: [
          "Bob Marley",
          "Peter Tosh",
          "UB40",
          "Damian Marley",
          "Protoje",
          "Los Cafres",
          "Nonpalidece",
          "Zona Ganjah",
          "Cultura Profética",
          "Alpha Blondy",
        ],
        "latin urban": [
          "Bad Bunny",
          "Rauw Alejandro",
          "Myke Towers",
          "Sech",
          "Nicky Jam",
          "Anitta",
          "Becky G",
          "Rosalía",
          "Cazzu",
          "Quevedo",
        ],
        electronic: [
          "Daft Punk",
          "Skrillex",
          "The Chemical Brothers",
          "Deadmau5",
          "Disclosure",
          "Kraftwerk",
          "Jean-Michel Jarre",
          "Aphex Twin",
          "Orbital",
          "Tycho",
          "Jon Hopkins",
        ],
        indie: [
          "Arctic Monkeys",
          "The Strokes",
          "Vance Joy",
          "Florence + The Machine",
          "Tame Impala",
          "Jack Johnson",
          "The Killers",
          "Bon Iver",
          "Daughter",
          "Local Natives",
          "Wet Leg",
        ],
        alternative: [
          "Nirvana",
          "Radiohead",
          "Red Hot Chili Peppers",
          "Linkin Park",
          "Green Day",
          "Pearl Jam",
          "Foo Fighters",
          "Depeche Mode",
          "Pixies",
          "Soundgarden",
          "Stone Temple Pilots",
          "Alice in Chains",
        ],
        ambient: [
          "Brian Eno",
          "Aphex Twin",
          "Sigur Rós",
          "Tycho",
          "Boards of Canada",
          "Enya",
          "Vangelis",
          "Max Richter",
          "Nils Frahm",
          "Hammock",
        ],
        jazz: [
          "Miles Davis",
          "Louis Armstrong",
          "John Coltrane",
          "Ella Fitzgerald",
          "Frank Sinatra",
          "Bill Evans",
          "Nina Simone",
          "Herbie Hancock",
          "Dave Brubeck",
          "Brad Mehldau",
          "Esperanza Spalding",
        ],
        blues: [
          "B.B. King",
          "Muddy Waters",
          "Eric Clapton",
          "John Lee Hooker",
          "Stevie Ray Vaughan",
          "Etta James",
          "Howlin' Wolf",
          "John Mayer",
          "Gary Clark Jr.",
          "Robert Johnson",
          "Son House",
        ],
        "lo-fi": [
          "Jinsang",
          "Idealism",
          "potsu",
          "Ehrling",
          "Nujabes",
          "Tomppabeats",
          "Kupla",
          "Lofi Girl",
          "Chillhop Music",
          "Joakim Karud",
          "Saib",
        ],
        soul: [
          "Aretha Franklin",
          "Stevie Wonder",
          "Marvin Gaye",
          "Bill Withers",
          "Sam Cooke",
          "Etta James",
          "Otis Redding",
          "Amy Winehouse",
          "Donny Hathaway",
          "Leon Bridges",
          "Celeste",
        ],
        acoustic: [
          "Ed Sheeran",
          "Jack Johnson",
          "Damien Rice",
          "Bon Iver",
          "Passenger",
          "José González",
          "Ben Howard",
          "Jason Mraz",
          "Ximena Sariñana",
          "Agnes Obel",
          "Fink",
        ],
        folk: [
          "Bob Dylan",
          "Joni Mitchell",
          "Simon & Garfunkel",
          "Mumford & Sons",
          "The Lumineers",
          "Mercedes Sosa",
          "Atahualpa Yupanqui",
          "Joan Baez",
          "Leonard Cohen",
          "Devendra Banhart",
          "Iron & Wine",
        ],
        "indie pop": [
          "The 1975",
          "Lorde",
          "Lana Del Rey",
          "Halsey",
          "Imagine Dragons",
          "Florence + The Machine",
          "Tame Impala",
          "MGMT",
          "Foster the People",
          "Glass Animals",
          "Clairo",
          "Beabadoobee",
        ],
        "soft rock": [
          "Fleetwood Mac",
          "Eagles",
          "Billy Joel",
          "Elton John",
          "Phil Collins",
          "Franco Simone",
          "Rod Stewart",
          "Lionel Richie",
          "Andrés Calamaro",
          "America",
          "Toto",
          "Christopher Cross",
          "Michael McDonald",
        ],
      };

      const searchQueries = [];
      const MAX_QUERIES_PER_GENRE = 2;

      genresArray.slice(0, 3).forEach((genre) => {
        searchQueries.push(`${genre} songs`);

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

      if (searchQueries.length < 3) {
        searchQueries.push("top global songs");
      }

      const combinedQuery = searchQueries.join(" OR ");

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

      {loading && <s.Message>Cargando clima...</s.Message>}

      {error && (
        <s.Message $isError>
          Error al cargar el clima: {error.message || "Ciudad no encontrada."}
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
            <s.Message>Buscando canciones entre las estrellas...</s.Message>
          )}

          {spotifyError && (
            <s.Message $isError>
              Canción perdida en el espacio:
              {spotifyError.message ||
                "Error desconocido en la nebulosa musical."}
            </s.Message>
          )}

          {spotifyPlaylist.length > 0 && (
            <s.PlaylistSection>
              <s.PlaylistHeading>
                Las canciones para vos... 🎵
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
