import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {optionsLineGraph, buildChartData} from '../util/util';

function LineGraph({casesType='cases', ...props}) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
      .then(res => res.json())
      .then(data => {
        let chartData = buildChartData(data, casesType);

        setData(chartData);
      });
    }

    fetchData();
  }, [casesType]);

  return (
    <div className={props.className}>
    {data?.length > 0 && (
      <Line 
        options={optionsLineGraph}
        data = {{
          datasets: [{
            backgroundColor: 'rgba(204, 16, 52, 0.5)',
            borderColor: '#CC1034',
            data: data
          }]
        }}
      />
    )}
    </div>
  )
}

export default LineGraph
