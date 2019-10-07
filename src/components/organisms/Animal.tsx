import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { PIXABAY_BASE_URL } from './../../api'
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
  height: 70vh;
  width: 70vw;
  /* border: 5px solid white; */
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
    const perPage = 199;
    const randomPage = Math.round((Math.random() * 50))
    let res = await axios.get(`${PIXABAY_BASE_URL}?key=13807530-1be241224f9cb9953219d6a4d&q=animal&safesearch=true&per_page=${perPage}&pagi=${randomPage}`);
    let idx = Math.round((Math.random() * 199))
    setImage(res.data.hits[idx].largeImageURL)
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
