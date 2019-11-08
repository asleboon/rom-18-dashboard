import React from 'react';
import axios from 'axios';
import { IPage } from '../../types/Page';
import { useHistory } from 'react-router';

const Temperature: React.FC<IPage> = ({ changePage, seconds }) => {
  const [temp, setTemp] = React.useState();
  const history = useHistory();

  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/');
    }
  }, [seconds]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://rom-18-server.azurewebsites.net/temp'
      );
      console.log(result.data);
      setTemp(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {
        temp && (
          <div>
            {/* <p>{temp.temp1}</p> */}
            {/* <p>{temp.temp2}</p> */}
            {/* <p>{temp.temp3}</p> */}
          </div>
        )
      }
    </div>
  )
};

export default Temperature;
