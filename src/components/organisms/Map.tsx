import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { MapStyles } from '../atoms/MapStyle';
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
  let history = useHistory();

  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/trafikk');
    }
  }, [seconds]);


  return (
    // Important! Always set the container height explicitly
    <MapDiv className="animated fadeInLeft">
      <MapCenter>
        <MapElement
          options={{
            styles: MapStyles,
            disableDefaultUI: true,
            backgroundColor: 'white',
          }}
          layerTypes={['TrafficLayer']}
          bootstrapURLKeys={{ key: 'AIzaSyBy3SCwdFsIntFwoi-uMjPaPMCtYeRWnFQ' }}
          defaultCenter={deaultCenter}
          defaultZoom={zoom}
        />
      </MapCenter>
    </MapDiv>
  );
};

export default Map;
