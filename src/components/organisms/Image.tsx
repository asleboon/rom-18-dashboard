import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { PIXABAY_BASE_URL } from '../../constants/api'
import { useHistory } from "react-router"
import { IPage } from '../../types/Page'
import { CircularProgress } from '@material-ui/core';

const ImageContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  max-height: 100%;
  border: 1px solid #afafaf;
  border-radius: 4px;
`


const Animal: React.FC<IPage> = ({
  changePage,
  seconds,
  pageNumber
}) => {
  let history = useHistory();
  const [isLoading, setLoading] = React.useState();
  const [image, setImage] = React.useState();

  React.useEffect(() => {
    fetchImage();
  }, [])

  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/')
    }
  }, [seconds])

  const fetchImage = async () => {
    setLoading(true)
    const perPage = 200;
    const searchTerm = 'kitten'
    const randomPage = Math.round((Math.random() * 10))
    let res = await axios.get(`${PIXABAY_BASE_URL}?key=13807530-1be241224f9cb9953219d6a4d&q=${searchTerm}&order=popular&safesearch=true&per_page=${perPage}&pagi=${randomPage}`);
    let idx = Math.round((Math.random() * 199))
    setImage(res.data.hits[idx].webformatURL)
    setLoading(false)
  }

  return (
    <ImageContainer>
      {
        !isLoading ? (
          <Image className="animated fadeInLeft" src={image} />
        ) :
          (<CircularProgress color="inherit" />)
      }
    </ImageContainer>
  )
}

export default Animal
