import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';
import axios from 'axios';
import { IPage } from '../../types/Page';
import { XKCD_URL } from '../../constants/api';

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  animation-delay: 0.5s;
  animation-duration: 1s;
`;

const Title = styled.p`
  font-size: 27px;
  font-weight: 700;
  width: 700px;
  word-wrap: break-word;
  margin-top: 0;
  color: black;
  text-align: center;
  border-radius: 4px;
`;

const Subtitle = styled.p`
  padding-top: 30px;
  font-size: 18px;
  font-weight: 200;
  font-style: italic;
  width: 700px;
  word-wrap: break-word;
  margin-top: 0;
  color: black;
  text-align: center;
  border-radius: 4px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ExtraInfo = styled.div`
  display: flex;
  color: black;
  justify-content: space-between;
  margin: 0;
`;

const Number = styled.p`
  padding: 0.5rem;
  font-weight: 700;
`;

const Year = styled.p`
  padding: 0.5rem;
  background-color: #ff7000;
  border-radius: 4px;
`;

export interface IComic {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

const Comic: React.FC<IPage> = ({ changePage, seconds }) => {
  const [comic, setComic] = React.useState<IComic>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  let history = useHistory();

  React.useEffect(() => {
    fetchComic();
  }, []);

  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/tegneserie');
    }
  }, [seconds]);

  // use corsanywhere to get comicstrip
  const fetchComic = async () => {
    setLoading(true);
    let res = await axios.get(`${XKCD_URL}`);
    setComic(res.data);
    setLoading(false);
  };

  return (
    <>
      {!isLoading && comic ? (
        <Container className="animated fadeInLeft">
          <Title>{comic ? comic.safe_title : ''}</Title>
          <ExtraInfo>
            <Number>{comic ? `#${comic.num}` : ''}</Number>
            <Year>{comic ? comic.year : ''}</Year>
          </ExtraInfo>
          <Image src={comic ? comic.img : ''} alt={comic ? comic.alt : ''} />
          <Subtitle>{comic ? comic.alt : ''}</Subtitle>
        </Container>
      ) : (
        <Container>
          <CircularProgress color="inherit" />
        </Container>
      )}
    </>
  );
};

export default Comic;
