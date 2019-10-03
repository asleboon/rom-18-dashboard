import React, { Component, useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import { MapStyles } from '../atoms/MapStyle';
import { History } from 'history';
import { IPage } from '../../types/Page'
import { useHistory } from 'react-router';

//const AnyReactComponent = ({ text }) => <div>{text}</div>;
const MapDiv = styled.div`
  height: 80vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
`;


const Map: React.FC<IPage> = ({
  changePage,
  seconds,
  pageNumber
}) => {
  const [deaultCenter, setDefaultCenter] = useState({ lat: 58.917064, lng: 5.718236 });
  const [zoom, setZoom] = useState(15);
  const [loadMap, setLoadMap] = useState(true);
  // const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  let history = useHistory();
  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/kart')
    }
  }, [seconds])

  // useEffect(() => {
  //   checkTime();
  //   // setInterval(() => {
  //   //   history.push('/')
  //   // }, 11000)
  // }, []);

  // useEffect(() => {
  //   let interval: any = null;
  //   if (seconds === 101) {
  //     reset();
  //   }
  //   interval = setInterval(() => {
  //     setSeconds(seconds => seconds + 1);
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [isActive, seconds]);

  // const reset = () => {
  //   checkTime();
  //   setSeconds(0);
  // };

  const checkTime = () => {
    // const format: string = 'hh:mm:ss';
    // const time = moment(),
    //   beforeTime = moment('07:00:00', format),
    //   afterTime = moment('19:00:00', format);
    // if (time.isBetween(beforeTime, afterTime)) {
    setLoadMap(true);
    //   console.log('is between');
    // } else {
    //   setLoadMap(false);
    //   console.log('is not between');
    // }
  };

  // const toggle = () => {
  //   setIsActive(!isActive);
  // }



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
      {loadMap && renderMap()}
    </MapDiv>
  );
};

export default Map;
