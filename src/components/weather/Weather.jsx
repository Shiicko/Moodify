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
        console.log("error al obtener datos");
        setError(err);
        setLoading(false);
      });
  }, [query]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setQuery(searchTerm);
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
        </>
      )}

      {!weatherData && !loading && !error && (
        <s.Message>Ingresa una ciudad para ver el clima.</s.Message>
      )}
    </s.Main>
  );
};
