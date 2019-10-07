import React, { Component, useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import { MapStyles } from '../atoms/MapStyle';
import { History } from 'history';
import { IPage } from '../../types/Page';
import { useHistory } from 'react-router';

const MapDiv = styled.div`
  height: 70vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
`;
const MapCenter = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: center;
`;
const MapElement = styled(GoogleMapReact)`
  height: 60%;
  width: 60%;
  box-shadow: 10px 10px black;
`;

const Map: React.FC<IPage> = ({ changePage, seconds, pageNumber }) => {
  const [deaultCenter, setDefaultCenter] = useState({ lat: 58.917064, lng: 5.718236 });
  const [zoom, setZoom] = useState(15);
  const [loadMap, setLoadMap] = useState(true);

  let history = useHistory();
  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/kart');
    }
  }, [seconds]);

  const renderMap = () => {
    return (
      <MapCenter>
        <MapElement
          options={{
            styles: MapStyles,
            disableDefaultUI: true,
            backgroundColor: 'orange'
          }}
          layerTypes={['TrafficLayer']}
          bootstrapURLKeys={{ key: 'AIzaSyBy3SCwdFsIntFwoi-uMjPaPMCtYeRWnFQ' }}
          defaultCenter={deaultCenter}
          defaultZoom={zoom}
        ></MapElement>
      </MapCenter>
    );
  };
  return (
    // Important! Always set the container height explicitly

    <MapDiv>{loadMap && renderMap()}</MapDiv>
  );
};

export default Map;
