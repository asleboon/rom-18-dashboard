import React from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring';
import { useHistory } from 'react-router';
import axios from 'axios'
import { IPage } from '../../types/Page';
import { XKCD_URL } from '../../api'

const Container = styled(animated.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.p`
  font-size: 16px;
  color: white;
`

const Image = styled.img`
 width: 1000px;
 height: 300px;
`

interface IComic {
  img: string;
  safe_title: string;
  number: number;
  alt: string;
}

const Comic: React.FC<IPage> = ({
  changePage,
  seconds,
}) => {
  const [comic, setComic] = React.useState<IComic>()
  let history = useHistory();

  React.useEffect(() => {
    fetchComic()
  }, [])

  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/')
    }
  }, [seconds])

  // use corsanywhere to get comicstrip
  const fetchComic = async () => {
    let res = await axios.get(XKCD_URL);
    console.log(res.data)
    setComic(res.data);
  }

  return (
    <>
      {
        comic && (
          <Container>
            <Title>{comic ? comic.safe_title : ''}</Title>
            <Image src={comic ? comic.img : ''} alt={comic ? comic.alt : ''} />
          </Container>
        )
      }
    </>
  )
}

export default Comic
