import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { History } from 'history';
import { animated, useSpring } from 'react-spring';
import { PIXABAY_BASE_URL } from './../../api'
import { useHistory } from "react-router"
import { IPage } from '../../types/Page'

const ImageContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled(animated.img)`
  height: 80vh;
  width: 70vw;
  /* border: 5px solid white; */
`


const Animal: React.FC<IPage> = ({
  changePage,
  seconds,
  pageNumber
}) => {
  let history = useHistory();
  const [image, setImage] = React.useState();
  const animationProps = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 3000 } })

  React.useEffect(() => {
    fetchImage();
  }, [])

  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/')
    }
  }, [seconds])

  const fetchImage = async () => {
    const perPage = 200;
    const randomPage = Math.round((Math.random() * 50))
    let res = await axios.get(`${PIXABAY_BASE_URL}?key=13807530-1be241224f9cb9953219d6a4d&q=animal&safesearch=true&per_page=${perPage}&page=${randomPage}`);
    let idx = Math.round((Math.random() * 199))
    setImage(res.data.hits[idx].largeImageURL)
  }

  return (
    <ImageContainer>
      {
        image && (
          <Image style={animationProps} src={image} />
        )
      }
    </ImageContainer>
  )
}

export default Animal
