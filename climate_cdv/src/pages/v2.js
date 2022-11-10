import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { resetZoom } from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const chart = new Chart(ctx, config);

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
    //legend: {
    //  position: 'top' as const,
    //},
    title: {
      display: true,
      text: 'Chart.js Line Chart',
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
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [23, 45, 88, 91, 78, 65, 48],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

// function resetZoomButton() {
//   chart.resetZoom()
// }

const Text = () => {
  const [showText, setShowText] = useState(false);
  return (
    <React.Fragment>
      {showText && <p className="info-text">Here we can write allllll the infos about the chart and what it means blablablalblalbalbla</p>}
      <button className="btn btn-outline-primary btn-info" onClick={() => setShowText(!showText)}>Infos</button>
    </React.Fragment>
  );
};

export default function v2() {

  return (
  <div>
    <Line options={options} data={data} />
    <Text/>
    <button type="button" class="btn btn-outline-primary">Reset zoom</button>
  </div>
  );
}