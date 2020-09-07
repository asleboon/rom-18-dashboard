import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { STOP_PLACE_QUERY } from "./../../graphql/query";
import styled from "styled-components";
import { IStopPlace, IEstimatedCall } from "./../../types/Transport";
import TransportRow from "./TransportRow";
import moment from "moment";

const TransportTableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransportTable = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  border: 1px solid #afafaf;
  border-radius: 4px;
`;

export interface IDeparture extends IEstimatedCall {
  departurePlace: string;
}

interface ITransport {
  stopIds: string[];
}

/**
 * Input a list of stopplaces and return an arrray of
 * departures
 * @param stopPlaces
 */
const refineData = (stopPlaces: IStopPlace[]) => {
  let allDepartures: IDeparture[] = [];
  stopPlaces.forEach((stops: IStopPlace) => {
    stops.estimatedCalls.forEach((call: IEstimatedCall) => {
      // add departure place on each departure
      allDepartures.push({ ...call, departurePlace: stops.name });
    });
  });
  return allDepartures;
};

/**
 *
 * @param stopPlaces
 */
const sortDataByDate = (allDepartures: IDeparture[]) => {
  // sort each item by date
  allDepartures.sort(function(a: IDeparture, b: IDeparture) {
    const timeCheck = moment(a.expectedArrivalTime).isBefore(
      moment(b.expectedArrivalTime)
    );
    if (!timeCheck) {
      return 1;
    } else {
      return -1;
    }
  });
  return allDepartures;
};

/**
 * returns a list with two lists -> [bus, train]
 * @param allDepartures
 */

const sortByTransportType = (allDepartures: IDeparture[]) => {
  let buses: IDeparture[] = [];
  let trains: IDeparture[] = [];

  allDepartures.forEach((departure: IDeparture) => {
    if (departure.serviceJourney.journeyPattern.line.transportMode === "bus") {
      buses.push(departure);
    } else {
      trains.push(departure);
    }
  });

  return [buses, trains];
};

const Transport: React.FC<ITransport> = ({ stopIds }) => {
  const [busDepartues, setBusDepartures] = React.useState<IDeparture[]>();
  const [trainDepartures, setTrainDepartures] = React.useState<IDeparture[]>();

  const { loading, error, data } = useQuery(STOP_PLACE_QUERY, {
    variables: { stopIds, n: 3 },
    pollInterval: 6000,
  });

  useEffect(() => {
    if (data) {
      const refinedData = refineData(data.stopPlaces);
      const sortedByDate = sortDataByDate(refinedData);
      const sortedByType = sortByTransportType(sortedByDate);
      setBusDepartures(sortedByType[0]);
      setTrainDepartures(sortedByType[1]);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :/ </p>;

  return (
    <TransportTableContainer>
      <TransportTable style={{ marginBottom: 4 }}>
        {busDepartues &&
          busDepartues.map((departure: IDeparture, idx: number) => {
            // let transportMode = departure.serviceJourney.journeyPattern.line.transportMode;
            return (
              <TransportRow
                key={idx + departure.aimedArrivalTime}
                departurePlace={departure.departurePlace}
                aimedArrivalTime={departure.aimedArrivalTime}
                expectedArrivalTime={departure.expectedArrivalTime}
                destinationDisplay={departure.destinationDisplay}
                serviceJourney={departure.serviceJourney}
                quay={departure.quay}
              />
            );
          })}
      </TransportTable>
      <TransportTable style={{ marginTop: 4 }}>
        {trainDepartures &&
          trainDepartures.map((departure: IDeparture, idx: number) => {
            // let transportMode = departure.serviceJourney.journeyPattern.line.transportMode;
            return (
              <TransportRow
                key={idx + departure.aimedArrivalTime}
                departurePlace={departure.departurePlace}
                aimedArrivalTime={departure.aimedArrivalTime}
                expectedArrivalTime={departure.expectedArrivalTime}
                destinationDisplay={departure.destinationDisplay}
                serviceJourney={departure.serviceJourney}
                quay={departure.quay}
              />
            );
          })}
      </TransportTable>
    </TransportTableContainer>
  );
};

export default Transport;
