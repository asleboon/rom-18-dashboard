import React from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring';
import { useHistory } from 'react-router';
import axios from 'axios'
import { IPage } from '../../types/Page';

const Container = styled(animated.div)`
  display: flex;
  width: 700px;
  height: 500px;
`

const Title = styled.p`
  font-size: 16px;
  color: white;
`

const Image = styled.img`
 width: 100%;
 height: 100%;
`

interface IComic {
  source: string;
  title: string;
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
    let res = await axios.get('http://xkcd.com/info.0.json');
    console.log(res.data)
    setComic(res.data);
  }

  return (
    <Container>
      <Title>{comic ? comic.title : ''}</Title>
      <Image src={comic ? comic.source : ''} alt={comic ? comic.alt : ''} />
    </Container>
  )
}

export default Comic
