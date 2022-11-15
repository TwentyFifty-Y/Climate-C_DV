import React, { useState, useEffect } from 'react';
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
import { Chart } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';

// import { resetZoom } from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function V2() {
  
  // const Text = () => {
  //   const [showText, setShowText] = useState(false);
  //   return (
  //     <React.Fragment>
  //       {showText && <p className="info-text">Here we can write allllll the infos about the chart and what it means blablablalblalbalbla</p>}
  //       <button className="btn btn-outline-primary btn-info" onClick={() => setShowText(!showText)}>Infos</button>
  //     </React.Fragment>
  //   );


    
  // };

  const [fetchedInfo, setFetchedInfo] = useState([]);

    useEffect(() => {
        axios.get("//localhost:3000/view1?id=view1GlobalMonthly").then((response) => {
            setFetchedInfo(response.data);
        });
    }, [])


    const chartData = (array) => {
        const labels = array.map(item => item.time);
        const data = array.map(item => item.anomaly);
        return {
            labels: labels,
            datasets: [
                {
                    label: "Global Monthly Anomaly",
                    data: data,
                    fill: false,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgba(255, 99, 132, 0.2)",
                },
            ],
        };
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Time Line Graph Demonstration",
            },
        },
        scales: {
            xAxis: {
                type: "time",
                time: {
                    unit: "month",
                },
            },
            yAxis: {
                type: "linear",
            },
        },
    };

    return (
        <div style={{ width: "1000px" }}>
            <h1>TimeLineGraphDemo</h1>
            <Line options={options} data={chartData(fetchedInfo)} />
        </div>
    );

}