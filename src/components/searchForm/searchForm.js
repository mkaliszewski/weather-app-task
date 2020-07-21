import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import LocationSearchInput from '../locationSearchInput/locationSearchInput';
import './searchForm.scss';

const SearchForm = ({ handleAddressChange, getWeather, isAdressVerified }) => (
  <Container className="form__container">
    <Form className="form" onSubmit={getWeather}>
      <Form.Field className="form__field">
        <LocationSearchInput handleAddressChange={handleAddressChange} />
      </Form.Field>

      <Button className="form__button" size="big" inverted type="submit" disabled={!isAdressVerified()}>
        Search for weather
      </Button>
    </Form>
  </Container>
);

export default SearchForm;
