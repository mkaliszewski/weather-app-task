import React, { useState, useEffect } from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
// styles
import './App.scss';
import { iconSelect } from './data/data-handler';
import SearchForm from './components/searchForm/searchForm';
import ResultsSet from './components/resultsSet/resultsSet';

const initialWeather = {
  city: '',
  country: '',
  lat: '',
  lng: '',
  temp: '',
  feelTemp: '',
  tempMin: '',
  tempMax: '',
  pressure: '',
  humidity: '',
  description: '',
  id: '',
  icon: '',
  hourForecast: {
    id: '',
    hourForecastHour: '',
    hourForecastTemp: '',
    hourForecastId: '',
    hourForecastIcon: '',
    hourForecastFeelTemp: '',
    hourForecastTempMin: '',
    hourForecastTempMax: '',
    hourForecastPressure: '',
    hourForecastHumidity: '',
    hourForecastDescription: '',
  },
  weekForecast: {
    id: '',
    weekForecastDay: '',
    weekForecastDayOfWeek: '',
    weekForecastMonth: '',
    weekForecastTemp: '',
    weekForecastId: '',
    weekForecastIcon: '',
    weekForecastFeelTemp: '',
    weekForecastTempMin: '',
    weekForecastTempMax: '',
    weekForecastPressure: '',
    weekForecastHumidity: '',
    weekForecastDescription: '',
  },
  error: null,
};

const initialAddress = {
  city: '',
  country: '',
  description: '',
};

const initialMessage = 'Welcome, type your city and country names above.';

const App = () => {
  const [weather, setWeather] = useState(initialWeather);
  const [message, setMessage] = useState(initialMessage);
  const [address, setAddress] = useState(initialAddress);
  const [isSearchFound, setIsSearchFound] = useState(false);
  const [isAdditionalClass, setIsAdditionalClass] = useState(false);

  useEffect(() => {
    const { city, country, error } = weather;
    const { description } = address;

    if (city && country && !error) {
      setMessage(description);
    } else if (error) {
      setMessage(error);
    }
  }, [weather, address]);

  const handleAddressChange = (terms, description) => {
    let countryName;
    const termsValues = terms.map(({ value }) => value);
    const [cityName] = termsValues;

    if (terms.length > 2) {
      [, , countryName] = termsValues;
    } else {
      [, countryName] = termsValues;
    }

    setAddress({ city: cityName, country: countryName, description });
  };

  const convertToHours = (unix) => new Date(unix * 1000).getHours();

  const convertToDateObject = (unix) => {
    const time = new Date(unix * 1000);
    return {
      hour: time.getHours(),
      day: time.getDate(),
      dayOfWeek: time.getDay(),
      month: time.getMonth(),
    };
  };

  const handleWeatherError = (errorMessage) => {
    setWeather({
      ...weather,
      error: errorMessage,
    });
  };

  const resetSearch = () => {
    setWeather(initialWeather);
    setMessage(initialMessage);
    setAddress(initialAddress);
    setIsSearchFound(false);

    setIsAdditionalClass(false);
  };

  const weatherURL = (city, country) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;

  const hourForecastUrl = (city, country) =>
    `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;

  const weatherURLs = (city, country) => [weatherURL(city, country), hourForecastUrl(city, country)];

  // API call
  const getWeather = async (e) => {
    e.preventDefault();

    const { city, country } = address;

    try {
      const fetchAll = await Promise.all(
        // eslint-disable-next-line no-undef
        weatherURLs(city, country).map((url) => fetch(url).then((data) => data.json()))
      );

      const weatherData = await fetchAll[0];
      const weatherDataHours = await fetchAll[1];

      if (!!weatherData && !!weatherDataHours) {
        setIsAdditionalClass(true);
        setTimeout(() => {
          setWeather({
            city: weatherData.name,
            country: weatherData.sys.country,
            lat: weatherData.coord.lat,
            lng: weatherData.coord.lon,
            temp: Math.round(weatherData.main.temp),
            feelTemp: Math.round(weatherData.main.feels_like),
            tempMin: Math.round(weatherData.main.temp_min),
            tempMax: Math.round(weatherData.main.temp_max),
            pressure: weatherData.main.pressure,
            humidity: weatherData.main.humidity,
            description: weatherData.weather[0].description,
            id: weatherData.weather[0].id,
            icon: iconSelect(weatherData.weather[0].id),
            error: null,
            hourForecast: weatherDataHours.list.slice(0, 8).map((item) => {
              return {
                id: item.dt,
                hourForecastHour: convertToDateObject(item.dt).hour,
                hourForecastTemp: Math.round(item.main.temp),
                hourForecastId: item.weather[0].id,
                hourForecastIcon: iconSelect(item.weather[0].id),
                hourForecastFeelTemp: Math.round(item.main.feels_like),
                hourForecastTempMin: Math.round(item.main.temp_min),
                hourForecastTempMax: Math.round(item.main.temp_max),
                hourForecastPressure: item.main.pressure,
                hourForecastHumidity: item.main.humidity,
                hourForecastDescription: item.weather[0].description,
              };
            }),
            weekForecast: weatherDataHours.list
              .filter((item) => {
                const minHour = 11;
                const maxHour = 13;
                return convertToHours(item.dt) >= minHour && convertToHours(item.dt) <= maxHour;
              })
              .map((item) => {
                return {
                  id: item.dt,
                  weekForecastDay: convertToDateObject(item.dt).day,
                  weekForecastDayOfWeek: convertToDateObject(item.dt).dayOfWeek,
                  weekForecastMonth: convertToDateObject(item.dt).month,
                  weekForecastTemp: Math.round(item.main.temp),
                  weekForecastId: item.weather[0].id,
                  weekForecastIcon: iconSelect(item.weather[0].id),
                  weekForecastFeelTemp: Math.round(item.main.feels_like),
                  weekForecastTempMin: Math.round(item.main.temp_min),
                  weekForecastTempMax: Math.round(item.main.temp_max),
                  weekForecastPressure: item.main.pressure,
                  weekForecastHumidity: item.main.humidity,
                  weekForecastDescription: item.weather[0].description,
                };
              }),
          });
          setIsSearchFound(true);
        }, 3000);
      } else {
        setWeather(initialWeather);
        handleWeatherError('Please enter city and country');
      }
    } catch (error) {
      setWeather(initialWeather);
      handleWeatherError('Please enter right city and country name');
    }
  };

  const isAdressVerified = () => {
    const { city, country } = address;

    return !!city && !!country;
  };
  return (
    <Container className="app">
      <Header className="app__header ">
        <h1 className="header__heading">Weather App</h1>
        {isSearchFound && (
          <Button className="header__button" inverted onClick={resetSearch}>
            Start new search
          </Button>
        )}
      </Header>
      <Container className={isAdditionalClass ? 'app__content app__content-animation' : 'app__content'}>
        {isSearchFound ? (
          <ResultsSet weather={weather} message={message} />
        ) : (
          <Container className={isAdditionalClass ? 'searchSection searchSection-animation' : 'searchSection'}>
            <SearchForm
              handleAddressChange={handleAddressChange}
              getWeather={getWeather}
              isAdressVerified={isAdressVerified}
            />
            <h4 className="searchSection__text">{message}</h4>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default App;
