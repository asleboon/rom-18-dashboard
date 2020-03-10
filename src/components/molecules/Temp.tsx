import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IPage } from '../../types/Page';
import Axios from 'axios';
import { useHistory } from 'react-router';
import moment from 'moment';
import Snowfall from 'react-snowfall';

const TransportTableContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const GraphContainer = styled.embed`
  width: 600px;
  height: 400px;
  border: 1px solid black;
  margin-top: calc(50vh - 300px);
`;

const Header = styled.h2`
  margin-left: 20px;
`;
/**
 * Input a list of stopplaces and return an arrray of
 * departures
 * @param stopPlaces
 */
interface TemperatureForAllRooms {
  created_at: string;
  entry_id: number;
  field1: null | string;
  field2: null | string;
  field3: null | string;
  field4: null | string;
  field5: null | string;
  field6: null | string;
}
const Temp: React.FC<IPage> = ({ changePage, seconds, pageNumber }) => {
  const [temperature, setTemperature] = useState<undefined | TemperatureForAllRooms>(undefined);
  const [lowest, setLowest] = useState<undefined | TemperatureForAllRooms>(undefined);
  const [highest, setHighest] = useState<undefined | TemperatureForAllRooms>(undefined);
  let history = useHistory();
  const Container = styled.div`
    margin-top: calc(50vh - 300px);
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 600px;
    height: 400px;
    border: 1px solid black;
    justify-content: center;
  `;
  const TextWithColor = styled.p`
    font-size: 20px;
    text-decoration: none;
    margin-left: 20px;
    color: ${temperature?.field4 &&
      (parseFloat(temperature?.field4) < 21.5
        ? '#0088BA'
        : parseFloat(temperature?.field4) > 24
        ? '#D0500C'
        : '#006F09')};
  `;
  const Text = styled.p`
    font-size: 20px;
    text-decoration: none;
    margin-left: 20px;
  `;
  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/temp');
    }
  }, [seconds]);
  useEffect(() => {
    Axios.get('https://api.thingspeak.com/channels/505282/feeds.json').then(temp => {
      const temps = temp.data.feeds;
      let lowestValue: undefined | TemperatureForAllRooms = undefined;
      let highestValue: undefined | TemperatureForAllRooms = undefined;
      temps.forEach((tempObject: TemperatureForAllRooms) => {
        if (tempObject.field4 !== null) {
          setTemperature(tempObject);
          if (lowestValue === undefined) {
            lowestValue = tempObject;
          } else if (lowestValue?.field4 !== null && parseFloat(lowestValue?.field4) > parseFloat(tempObject.field4)) {
            lowestValue = tempObject;
          }
          if (highestValue === undefined) {
            highestValue = tempObject;
          } else if (
            highestValue?.field4 !== null &&
            parseFloat(highestValue?.field4) < parseFloat(tempObject.field4)
          ) {
            highestValue = tempObject;
          }
        }
      });
      setLowest(lowestValue);
      setHighest(highestValue);
    });
  }, []);

  return (
    <TransportTableContainer>
      {temperature?.field4 && parseFloat(temperature?.field4) < 21.5 && <Snowfall />}

      <GraphContainer
        src={
          'https://thingspeak.com/channels/505282/charts/4?bgcolor=%23ffffff&color=%23d62020&days=1&dynamic=true&title=Rom+18&type=line&yaxismax=25&yaxismin=18&height=400&width=600'
        }
      />

      <Container>
        <Header>Oversikt over de siste 6 timene:</Header>
        <TextWithColor>Temperaturen er nå {temperature?.field4}° C</TextWithColor>
        <Text>
          Temperaturen var på det laveste {lowest?.field4}° C klokken {moment(lowest?.created_at).format('HH:mm')}
        </Text>
        <Text>
          Temperaturen var på det høyeste {highest?.field4}° C klokken {moment(highest?.created_at).format('HH:mm')}
        </Text>
      </Container>
    </TransportTableContainer>
  );
};

export default Temp;
