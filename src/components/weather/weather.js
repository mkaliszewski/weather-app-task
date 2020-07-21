import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import './weather.styles.scss';

const Weather = ({
  weather: { temp, feelTemp, tempMin, tempMax, pressure, humidity, description, icon },
  message,
  modal,
}) => {
  const weatherDataTemerature = [
    { title: 'Temperature', value: `${temp}` },
    { title: 'Feel temperature', value: `${feelTemp}` },
    { title: 'Min. temperature', value: `${tempMin}` },
    { title: 'Max. Temperature', value: `${tempMax}` },
  ];

  const weatherDataOthers = [
    { title: 'Pressure', value: `${pressure} `, symbol: 'hPa' },
    { title: 'Humidity', value: `${humidity}`, symbol: '%' },
  ];
  return (
    <Container className={modal ? 'weather weather-modal' : 'weather'}>
      <h4 className="weather__heading">{message}</h4>
      <Container className="weather__container">
        <Container className="weather__container-col1">
          {weatherDataTemerature.map(({ title, value }) => {
            return (
              <p key={title}>
                {title}: <span className="weather__span">{value} &#8451;</span>
              </p>
            );
          })}

          {weatherDataOthers.map(({ title, value, symbol }) => {
            return (
              <p key={title}>
                {title}:{' '}
                <span className="weather__span">
                  {value}
                  {symbol}
                </span>
              </p>
            );
          })}
        </Container>
        <Container className="weather__container-col2">
          <Image src={icon} alt="weather icon" size="medium" />
          <p>{description.toUpperCase()}</p>
        </Container>
      </Container>
    </Container>
  );
};

export default Weather;
