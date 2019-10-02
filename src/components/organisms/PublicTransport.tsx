import React from 'react'
import Transport from '../molecules/Transport'
import styled from 'styled-components'

const PublicTransportContainer = styled.div`
  display: flex;
  justify-content: center;
`

const PublicTransport: React.FC = () => {
  return (
    <PublicTransportContainer>
      <Transport stopIds={['NSR:StopPlace:27172', 'NSR:StopPlace:362', 'NSR:StopPlace:26919']} />
    </PublicTransportContainer>
  )
}

export default PublicTransport
