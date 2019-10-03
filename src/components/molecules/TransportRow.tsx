import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IDeparture } from './Transport';
import moment, { Moment } from 'moment';
import { IoIosBus, IoIosTrain } from 'react-icons/io'

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr 2fr;
  justify-items: space-around;
  align-items: center;
  height: 90px;
  margin: 1px;
  padding-left: 25px;
  background-color: rgba(255,255,255, 0.8);
`

const Text = styled.div`
  display: flex;
  font-size: 20px;
  color: black;
`

const TrainIcon = styled(IoIosTrain)`
  width: 35px;
  height: 35px;
  padding-left: 50%;
`

const BusIcon = styled(IoIosBus)`
  width: 35px;
  height: 35px;
  padding-left: 50%;
`

const TransportRow: React.FC<IDeparture> = ({
  serviceJourney,
  departurePlace,
  aimedArrivalTime,
  expectedArrivalTime,
  destinationDisplay,
}) => {
  const [nextDeparture, setNextDeparture] = useState()
  useEffect(() => {
    let formatedTime = formatTime(expectedArrivalTime);
    setNextDeparture(formatedTime);
  }, [expectedArrivalTime])

  const formatTime = (timeString: string) => {
    // let delayed = Math.abs((+new Date(aimedArrivalTime)) - (+new Date(expectedArrivalTime)))
    let untilArrival = Math.abs((+new Date(expectedArrivalTime) - Date.now()))
    let untilArrivalString = moment(untilArrival).format('m');
    if (untilArrivalString === '0') {
      return 'Nå'
    }
    return `${untilArrivalString} minutt`
  }

  return (
    <Container>
      {/* <Text>{moment(aimedArrivalTime).format('HH:mm')}</Text> */}
      <Text>{nextDeparture}</Text>
      {/* <Text>{departurePlace}</Text> */}
      <Text>{destinationDisplay.frontText}</Text>
      <Text>{serviceJourney.journeyPattern.line.transportMode === 'bus' ? <BusIcon /> : <TrainIcon />}</Text>
    </Container>
  )
}

export default TransportRow
