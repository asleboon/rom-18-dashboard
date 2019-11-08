import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { PIXABAY_BASE_URL } from '../../constants/api';
import { useHistory } from 'react-router';
import { IPage } from '../../types/Page';
import { CircularProgress } from '@material-ui/core';
import { QUOTES_API } from './../../constants/api';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-delay: .5s;
`;

const Image = styled.img`
  max-height: 100%;
  border: 1px solid #afafaf;
  border-radius: 4px;
`;

const QuoteContainer = styled.div`
  position: absolute;
  left: 50px;
  width: 300px;
  line-height: 40px;
  word-wrap: break-word;
`;

const Quote = styled.p`
  font-size: 22px;
  font-style: italic;
  font-weight: 700;
`;

const Author = styled.p`
  font-size: 18px;
  font-style: italic;
`;

const Animal: React.FC<IPage> = ({ changePage, seconds, pageNumber }) => {
  let history = useHistory();
  const [isLoading, setLoading] = React.useState();
  const [image, setImage] = React.useState();
  const [quote, setQuote] = React.useState();

  React.useEffect(() => {
    fetchImageAndQuote();
  }, []);

  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/');
    }
  }, [seconds]);

  const fetchImageAndQuote = async () => {
    setLoading(true);
    const perPage = 200;
    const searchTerm = 'kitten';
    const randomPage = Math.round(Math.random() * 10);
    let resImg = await axios.get(
      `${PIXABAY_BASE_URL}?key=13807530-1be241224f9cb9953219d6a4d&q=${searchTerm}&order=popular&safesearch=true&per_page=${perPage}&pagi=${randomPage}`
    );
    let resQuote = await axios.get(`${QUOTES_API}/quotes/random/lang/en`);
    let idx = Math.round(Math.random() * 199);
    setImage(resImg.data.hits[idx].webformatURL);
    setQuote(resQuote.data);
    setLoading(false);
  };

  return (
    <Container>
      {!isLoading && quote && image ? (
        <>
          <ImageContainer className="animated fadeInLeft">
            <Image src={image} />
          </ImageContainer>
          <QuoteContainer>
            <Quote>{quote.en}</Quote>
            <Author>{'- ' + quote.author}</Author>
          </QuoteContainer>
        </>
      ) : (
          <CircularProgress color="inherit" />
        )}
    </Container>
  );
};

export default Animal;
