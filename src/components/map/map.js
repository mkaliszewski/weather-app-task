import React from 'react';
// styles
import './map.styles.scss';
// components
import GoogleMapReact from 'google-map-react';
import MapPointer from '../map-pointer/mapPointer';

const Map = ({ weather: { lat, lng } }) => {
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        center={{ lat, lng }}
        zoom={8}
      >
        <MapPointer lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
};
export default Map;
