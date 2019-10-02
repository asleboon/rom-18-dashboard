import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
// environment variables
import now from './../../now.json'
import { PIXABAY_BASE_URL } from '../../api'

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

const Animal: React.FC = () => {
  const [image, setImage] = React.useState();
  const imageProps = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 3000 } })
  React.useEffect(() => {
    fetchImage();
  }, [])

  const fetchImage = async () => {
    let res = await axios.get(`${PIXABAY_BASE_URL}?key=${now.build.env.PIXABAY_API_KEY}&q=animal`);
    setImage(res.data.hits[0].largeImageURL)
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
