import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import { IPage } from '../../types/Page';

const ImageContainer = styled.div`
  margin-top: 10%;
  max-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: Row;
  justify-content: center;
  align-items: center;
`;
const DailyCotainer = styled.div`
  height: 200px;
  width: 200px;
  border: solid;
  border-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: pink;
`;
const CurrentWeatherText = styled.p`
  display: flex;
`;
const Image = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Weather: React.FC<IPage> = ({ changePage, seconds, pageNumber }) => {
  const [image, setImage] = React.useState();
  const [futureImage, setFutureImage] = React.useState();
  const [imageDayOne, setImageDayOne] = React.useState();
  const [currentWeather, setCurrentWeather] = React.useState();
  const [futureWeather, setFutureWeather]: any = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  let history = useHistory();
  React.useEffect(() => {
    fetchWeather();
  }, []);
  const fetchWeather = async () => {
    let currentWeather: any = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?id=6453391&units=metric&appid=c6e8619eea5061ea18d709d19ecd3525`
    );
    setCurrentWeather(currentWeather);
    setImage(`http://openweathermap.org/img/wn/${currentWeather.data.weather[0].icon}@2x.png`);
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?id=6453391&units=metric&appid=c6e8619eea5061ea18d709d19ecd3525`
      )
      .then(weather => {
        const weatherList: any = [];
        const images: string[] = [];
        weather.data.list.forEach((weatherDays: any) => {
          const time = weatherDays.dt_txt.split(' ')[1];
          if (time === '15:00:00') {
            weatherList.push(weatherDays);
            if (weatherDays.weather[0].icon) {
              images.push(`http://openweathermap.org/img/wn/${weatherDays.weather[0].icon}@2x.png`);
            }
          }
        });
        setFutureWeather(weatherList);
        setFutureImage(images);
        setLoading(false);
      });
  };
  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/weather');
    }
  }, [seconds]);
  const getDay = (index: number) => {
    const week = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
    const day = moment(new Date())
      .add(index + 1, 'days')
      .weekday();
    return week[day];
  };
  if (isLoading) {
    return (
      <ImageContainer>
        <CircularProgress color="inherit" />
      </ImageContainer>
    );
  } else {
    return (
      <ImageContainer>
        <DailyCotainer>
          <CurrentWeatherText>I dag</CurrentWeatherText>
          <Image src={image} />
          <CurrentWeatherText>
            {currentWeather && Math.round(currentWeather.data.main.temp_min)}/
            {Math.round(currentWeather && currentWeather.data.main.temp_max)}
          </CurrentWeatherText>
        </DailyCotainer>
        {futureWeather &&
          futureWeather.map((weather: any, index: number) => {
            return (
              <DailyCotainer key={index}>
                <CurrentWeatherText>{getDay(index)}</CurrentWeatherText>
                <Image src={futureImage && futureImage[index] && futureImage[index]} />
                <CurrentWeatherText>
                  {futureWeather[index] && futureWeather[index].main && Math.round(futureWeather[index].main.temp_min)}/
                  {futureWeather[index] && futureWeather[index].main && Math.round(futureWeather[index].main.temp_max)}
                </CurrentWeatherText>
              </DailyCotainer>
            );
          })}
      </ImageContainer>
    );
  }
};

export default Weather;
