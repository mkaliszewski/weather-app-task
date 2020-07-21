import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import PropTypes from 'prop-types';
import './locationSearchInput.scss';

const LocationSearchInput = ({ handleAddressChange }) => {
  return (
    <div>
      <GooglePlacesAutocomplete
        renderSuggestions={(active, suggestions, onSelectSuggestion) => (
          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <div
                className="suggestion"
                onClick={(event) => onSelectSuggestion(suggestion, event)}
                onKeyDown={(event) => onSelectSuggestion(suggestion, event)}
                role="button"
                tabIndex={0}
                key={suggestion.place_id}
              >
                {suggestion.description}
              </div>
            ))}
          </div>
        )}
        onSelect={({ terms, description }) => handleAddressChange(terms, description)}
      />
    </div>
  );
};

LocationSearchInput.propTypes = {
  handleAddressChange: PropTypes.func,
};

LocationSearchInput.defaultProps = {
  handleAddressChange: () => {},
};

export default LocationSearchInput;
