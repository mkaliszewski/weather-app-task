import React from 'react';
import { Image, Card, Modal } from 'semantic-ui-react';
import Weather from '../weather/weather';
import './forecastCard.styles.scss';

const ForecastCard = ({ hourWeather, weekWeather, hour }) => {
  const {
    hourForecastHour,
    hourForecastTemp,
    hourForecastIcon,
    hourForecastFeelTemp,
    hourForecastTempMin,
    hourForecastTempMax,
    hourForecastPressure,
    hourForecastHumidity,
    hourForecastDescription,
  } = hourWeather;

  const {
    weekForecastDay,
    weekForecastDayOfWeek,
    weekForecastMonth,
    weekForecastTemp,
    weekForecastId,
    weekForecastIcon,
    weekForecastFeelTemp,
    weekForecastTempMin,
    weekForecastTempMax,
    weekForecastPressure,
    weekForecastHumidity,
    weekForecastDescription,
  } = weekWeather;

  const weatherHour = {
    temp: hourForecastTemp,
    feelTemp: hourForecastFeelTemp,
    tempMin: hourForecastTempMin,
    tempMax: hourForecastTempMax,
    pressure: hourForecastPressure,
    humidity: hourForecastHumidity,
    description: hourForecastDescription,
    icon: hourForecastIcon,
  };

  const weatherWeek = {
    temp: weekForecastTemp,
    feelTemp: weekForecastFeelTemp,
    tempMin: weekForecastTempMin,
    tempMax: weekForecastTempMax,
    pressure: weekForecastPressure,
    humidity: weekForecastHumidity,
    description: weekForecastDescription,
    icon: weekForecastIcon,
  };

  const days = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday',
  };
  const months = {
    0: 'Jan.',
    1: 'Feb.',
    2: 'Mar.',
    3: 'Apr.',
    4: 'May.',
    5: 'Jun.',
    6: 'Jul.',
    7: 'Aug.',
    8: 'Sept.',
    9: 'Oct.',
    10: 'Nov.',
    11: 'Dec.',
  };

  const convertToDay = (day) => days[day];
  const convertToMonth = (month) => months[month];
  const getEndDay = (day) => {
    if (day === 1) {
      return 'st';
    }
    if (day === 2) {
      return 'nd';
    }
    return 'th';
  };

  const dateEnd = getEndDay(weekForecastDay);
  const weekInfoText = `${convertToDay(weekForecastDayOfWeek)}, ${weekForecastDay}${dateEnd} ${convertToMonth(
    weekForecastMonth
  )}`;
  const hourInfoText = `${hourForecastHour}:00`;
  const temperature = hour ? hourForecastTemp : weekForecastTemp;
  const time = hour ? hourInfoText : weekInfoText;
  const modalHeaderText = hour ? `at ${hourInfoText}` : `on ${weekInfoText}`;
  const icon = hour ? hourForecastIcon : weekForecastIcon;

  return (
    <Modal
      color="black"
      className="modal"
      trigger={
        <Card className={hour ? 'card' : 'card card-week'}>
          <Card.Content>
            <Card.Header className="card__header">{temperature} &#8451;</Card.Header>

            <Image src={icon} alt="Hour forecast" size="small" />
          </Card.Content>
          <Card.Content extra className="card__footer">
            {time}
          </Card.Content>
        </Card>
      }
    >
      <Modal.Header className="modal__header">{`Expected weather ${modalHeaderText}`}</Modal.Header>
      <Modal.Content className="modal__content">
        <Weather weather={hour ? weatherHour : weatherWeek} modal />
      </Modal.Content>
    </Modal>
  );
};

export default ForecastCard;
