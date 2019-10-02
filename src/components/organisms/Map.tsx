import React, { Component, useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import { MapStyles } from '../atoms/MapStyle';
//const AnyReactComponent = ({ text }) => <div>{text}</div>;
const MapDiv = styled.div`
  height: 100vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const MapCenter = styled.div`
  height: 70%;
  width: 70%;
  display: flex;
  justify-content: center;
`;
const MapElement = styled(GoogleMapReact)`
  height: 60%;
  width: 60%;
`;
const Donut = styled.div`
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
`;
const Circle = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const AnimatedDonut = animated(CircularProgress);
const Map: React.FC = () => {
  const [deaultCenter, setDefaultCenter] = useState({ lat: 58.917064, lng: 5.718236 });
  const [zoom, setZoom] = useState(15);
  const [loadMap, setLoadMap] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  function toggle() {
    setIsActive(!isActive);
  }
  useEffect(() => {
    checkTime();
  }, []);

  const reset = () => {
    checkTime();
    setSeconds(0);
  };
  const checkTime = () => {
    const format: string = 'hh:mm:ss';
    const time = moment(),
      beforeTime = moment('07:00:00', format),
      afterTime = moment('19:00:00', format);
    if (time.isBetween(beforeTime, afterTime)) {
      setLoadMap(true);
      console.log('is between');
    } else {
      setLoadMap(false);
      console.log('is not between');
    }
  };
  useEffect(() => {
    let interval: any = null;
    if (seconds === 101) {
      reset();
    }
    interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, seconds]);
  const renderMap = () => {
    return (
      <MapCenter>
        <MapElement
          options={{
            styles: MapStyles
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

    <MapDiv>
      <Circle>
        <AnimatedDonut value={seconds} variant="static" size="70px" />
      </Circle>
      {loadMap && renderMap()}
    </MapDiv>
  );
};

export default Map;
