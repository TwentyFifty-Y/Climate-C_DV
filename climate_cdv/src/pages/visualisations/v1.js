import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

export const options = {
  responsive: true,
  plugins: {
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  },
  limits: {
    x: {min: -200, max: 200, minRange: 50},
    y: {min: -200, max: 200, minRange: 50}
  },
  pan: {
    enabled: true,
    mode: 'xy',
  },
    // legend: {
    //  position: 'top',
    // },
    title: {
      display: true,
      text: 'Name of the chart yaaasss',
  },
    zoom: {
      limits: {
        y: {min: 0, max: 100, minRange: 1},
        x: {min: 0, max: 100, minRange: 1}
      },
      zoom: {
        wheel: {
          enabled: true,
          // speed: 0.05
        },
        pinch: {
          enabled: true,
          // speed: 0.05
        },
        // drag: {
        //   enabled: true,
        // },
        mode: 'xy',
      },
      pan: {
        enabled: true,
        mode: 'xy',
      }
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Country 1',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgb(255, 99, 132)',
      tension: 1,
    },
    {
      label: 'Country 2',
      data: [23, 45, 88, 91, 78, 65, 48],
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Country 3',
      data: [56, 5, 48, 71, 28, 75, 48],
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

const Text = () => {
  const [showText, setShowText] = useState(false);
  return (
    <React.Fragment>
      {showText && <p className="info-text">Here we can write allllll the infos about the chart and what it means blablablalblalbalbla</p>}
      <button className="btn btn-outline-primary btn-info" onClick={() => setShowText(!showText)}>Infos</button>
    </React.Fragment>
  );
};

export default function V1() {
  return (
    <div>
      <Bar options={options} data={data} />
      <Text/>
      <button type="button" className="btn btn-outline-primary">Reset zoom</button>
    </div>
  );
}