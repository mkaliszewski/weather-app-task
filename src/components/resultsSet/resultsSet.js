import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import './resultsSet.scss';
import Weather from '../weather/weather';
import Map from '../map/map';
import Forecast from '../forecast/forecast';

const ResultsSet = ({ weather, message, isAdditionalClass }) => {
  const [isHourWeather, setIsHourWeather] = useState(true);

  const toggleWeatherRange = () => {
    setIsHourWeather(!isHourWeather);
  };

  return (
    <Grid className={isAdditionalClass ? 'resultsSet  resultsSet-animation' : 'resultsSet'}>
      <Grid.Column className="resultsSet-col1" width={8}>
        <Weather weather={weather} message={message} />
      </Grid.Column>
      <Grid.Column width={8}>
        <Forecast weather={weather} hour={isHourWeather} toggleWeatherRange={toggleWeatherRange} />
        <Map weather={weather} />
      </Grid.Column>
    </Grid>
  );
};

export default ResultsSet;
