import {Circle, Popup} from 'react-leaflet';
import numeral from 'numeral';

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 350,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 750,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 1350,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
}

export const showDataOnMap = (data, casesType='cases') => (
  data.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className='info-container'>
          <div
          className='info-flag'
            style={{backgroundImage: `url(${country.countryInfo.flag})`}}
          />
          <div className='info-name'>{country.country}</div>
          <div className='info-confirmed'>Cases: {numeral(country.cases).format('0,0')}</div>
          <div className='info-recovered'>Recovered: {numeral(country.recovered).format('0,0')}</div>
          <div className='info-deaths'>Deaths: {numeral(country.deaths).format('0,0')}</div>
        </div>
      </Popup>
    </Circle>
  ))
);

export const buildChartData = (data, casesType='cases') => {
  const chartData = [];
  let lastDataPoint;

  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint
      }
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
}

export const prettyPrintStat = stat => 
  stat ? `+${numeral(stat).format('0.0a')}` : "+0";

export const optionsLineGraph = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function(tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0')
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          parser: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function(value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
}