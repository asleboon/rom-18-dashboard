import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { History } from 'history';
import { animated, useSpring } from 'react-spring';
import { PIXABAY_BASE_URL } from './../../api';
import { useHistory } from 'react-router';
import { IPage } from '../../types/Page';

const ImageContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FagKaffe: React.FC<IPage> = ({ changePage, seconds, pageNumber }) => {
  let history = useHistory();
  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/kart');
    }
  }, [seconds]);

  return <ImageContainer>FAGKAFFE</ImageContainer>;
};

export default FagKaffe;
