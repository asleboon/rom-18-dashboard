import { gql } from 'apollo-boost';

export const STOP_PLACE_QUERY = gql`
 query StopPlace($stopIds: [String!]!, $n: Int!) {
  stopPlaces(ids: $stopIds) {
    id
    name
    estimatedCalls(timeRange: 72100, numberOfDepartures: $n) {
      realtime
      aimedArrivalTime
      expectedArrivalTime
      destinationDisplay {
        frontText
      }
      serviceJourney {
        journeyPattern {
          line {
            id
            name
            transportMode
          }
        }
      }
    }
  }
}
`;