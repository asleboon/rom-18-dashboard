import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import moment from 'moment';
import { STOP_PLACE_QUERY } from './../../graphql/query';
import styled from 'styled-components';
import { IoIosBus, IoIosTrain } from 'react-icons/io'
import { IStopPlace, IEstimatedCall } from './../../types/Transport'


const TransportContainer = styled.div`
  display: flex;
  width: 60vw;
  flex-direction: column;
`

const TransportTitle = styled.h3`
  color: white;
  font-size: 26px;
  text-shadow: 2px 3px 0px #898999;
  text-align: center;
`

const DepartureContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
`

const TrainIcon = styled(IoIosTrain)`
  width: 30px;
  height: 30px;
  padding: 0 5px;
`

const BusIcon = styled(IoIosBus)`
  width: 30px;
  height: 30px;
  padding: 0 5px;
`

const DepatureDestination = styled.div`

`

const DepartureInfo = styled.p`
  color: white;
  font-size: 16px;
  padding: 10px;
`


interface ITransport {
  stopIds: string[];
}

interface IDeparture extends IEstimatedCall {
  departurePlace: string;
}

const Transport: React.FC<ITransport> = ({
  stopIds
}) => {
  const { loading, error, data } = useQuery(STOP_PLACE_QUERY, {
    variables: { stopIds, n: 5 }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const sortDataByDate = (stopPlaces: IStopPlace[]) => {
    // concat all lists
    // TODO: types
    let allDepartures: IDeparture[] = [];
    stopPlaces.forEach((stops: IStopPlace) => {
      stops.estimatedCalls.forEach((call: IEstimatedCall) => {
        // add departure place on each departure
        allDepartures.push({ ...call, departurePlace: stops.name })
      })
    })

    // sort each item by date
    allDepartures.sort(function (a: IDeparture, b: IDeparture) {
      return new Date(a.aimedArrivalTime).getTime() - new Date(b.aimedArrivalTime).getTime()
    });
    return allDepartures
  }

  let departures: IDeparture[] = sortDataByDate(data.stopPlaces)

  return (
    <TransportContainer>
      <TransportTitle>Avgangstider</TransportTitle>
      {departures.length > 0 &&
        departures.map((departure: IDeparture, idx: number) => {
          let moreInfo = departure.serviceJourney.journeyPattern.line
          return (
            <DepartureContainer key={idx + departure.aimedArrivalTime}>
              <DepartureInfo>{moment(departure.aimedArrivalTime).format('HH:mm')}</DepartureInfo>
              <DepartureInfo>{moment(departure.expectedArrivalTime).format('HH:mm')}</DepartureInfo>
              <DepartureInfo>Avgang: {departure.departurePlace}</DepartureInfo>
              <DepartureInfo>Destination: {departure.destinationDisplay.frontText}</DepartureInfo>
              {moreInfo.transportMode === 'bus' ? <BusIcon /> : <TrainIcon />}
            </DepartureContainer>
          )
        }
        )}
    </TransportContainer>
  )
}

export default Transport
