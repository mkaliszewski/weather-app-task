import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import ForecastCard from '../forecastCard/forecastCard';
import './forecast.scss';

const Forecast = ({ weather: { hourForecast, weekForecast }, hour, toggleWeatherRange }) => {
  return (
    <Container className="forecast">
      <Button inverted onClick={toggleWeatherRange} className="forecast__button">
        {hour ? '5 days weather' : 'hour weather'}
      </Button>
      {hour ? (
        <Container className="forecast__content">
          <h2>Hour forecast</h2>
          <Container className="forecast__icons">
            {hourForecast.map((hourWeather) => (
              <ForecastCard hourWeather={hourWeather} weekWeather={{}} hour key={hourWeather.hourForecastHour} />
            ))}
          </Container>
        </Container>
      ) : (
        <Container className="forecast__content">
          <h2>5 days forecast</h2>
          <Container className="forecast__icons">
            {weekForecast.map((weekWeather) => (
              <ForecastCard weekWeather={weekWeather} hourWeather={{}} key={weekWeather.weekForecastDay} />
            ))}
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default Forecast;
