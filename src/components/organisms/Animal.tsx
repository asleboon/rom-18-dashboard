import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { History } from 'history';
import { animated, useSpring } from 'react-spring';
import { PIXABAY_BASE_URL } from './../../api'
import { useHistory } from "react-router"
import { IPage } from './PublicTransport'

const ImageContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled(animated.img)`
  width: 100vw;
  width: 100vh;
  /* border: 5px solid white; */
`


const Animal: React.FC<IPage> = ({
  changePage
}) => {
  let history = useHistory();
  // changePage(history, '/')
  const [image, setImage] = React.useState();
  const imageProps = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 3000 } })

  React.useEffect(() => {
    fetchImage();
    // setInterval(() => {
    //   history.push('/kollektiv')
    // }, 10500)
  }, [])

  const fetchImage = async () => {
    let res = await axios.get(`${PIXABAY_BASE_URL}?key=13807530-1be241224f9cb9953219d6a4d&q=animal&safesearch=true&per_page=50`);
    let idx = Math.round((Math.random() * 49))
    setImage(res.data.hits[idx].largeImageURL)
  }

  return (
    <ImageContainer>
      {
        image && (
          <Image style={imageProps} src={image} />
        )
      }
    </ImageContainer>
  )
}

export default Animal
