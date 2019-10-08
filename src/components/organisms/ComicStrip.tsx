import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';
import axios from 'axios'
import { IPage } from '../../types/Page';
import { XKCD_URL } from '../../constants/api'

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Title = styled.p`
  font-size: 32px;
  font-weight: 700;
  width: 700px;
  word-wrap: break-word;
  margin-top: 0;
  color: black;
  text-align: center;
  border-radius: 4px;
`

const Subtitle = styled.p`
  padding-top: 50px;
  font-size: 18px;
  font-weight: 200;
  font-style: italic;
  width: 700px;
  word-wrap: break-word;
  margin-top: 0;
  color: black;
  text-align: center;
  border-radius: 4px;
`

const Image = styled.img`
 max-width: 100%;
 max-height: 100%;
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
  const [isLoading, setLoading] = React.useState<boolean>(false)
  let history = useHistory();

  React.useEffect(() => {
    fetchComic()
  }, [])

  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/tegneserie')
    }
  }, [seconds])

  // use corsanywhere to get comicstrip
  const fetchComic = async () => {
    setLoading(true)
    let date = new Date;
    // number between 0-2200 based on the hour of the day
    // getHours(), between 0 - 24 ?
    let randomNumber = Math.round((Math.random() * 90) * date.getHours()) // between 0 and 2200
    let res = await axios.get(`${XKCD_URL}/${randomNumber}/info.0.json`);
    setComic(res.data);
    setLoading(false)
  }

  return (
    <>
      {
        !isLoading ? (
          <Container className="animated fadeInLeft">
            <Title>{comic ? comic.safe_title : ''}</Title>
            <Image src={comic ? comic.img : ''} alt={comic ? comic.alt : ''} />
            <Subtitle>{comic ? comic.alt : ''}</Subtitle>
          </Container>
        )
          :
          (
            <Container>
              <CircularProgress color="inherit" />
            </Container>
          )
      }
    </>
  )
}

export default Comic
