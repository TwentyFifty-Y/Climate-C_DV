import React, { useState, useEffect } from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
import { Chart } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';

// import { resetZoom } from 'chartjs-plugin-zoom';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

export default function V2() {

    const Text = () => {
        const [showText, setShowText] = useState(false);
        return (
            <React.Fragment>
                <button className="btn btn-outline-primary btn-info" onClick={() => setShowText(!showText)}>Infos</button>
                <br />
                {showText &&
                    <p className="info-text">Here we can write allllll the infos about the chart and what it means blablablalblalbalbla</p>}
            </React.Fragment>
        );
    };

    
  // };

  const [globalAnnualData, setGlobalAnnualData] = useState([]);
  const [globalMonthlyData, setGlobalMonthlyData] = useState([]);
  const [northMonthlyData, setNorthMonthlyData] = useState([]);
  const [northAnnualData, setNorthAnnualData] = useState([]);
  const [southAnnualData, setSouthAnnualData] = useState([]);
  const [southMonthlyData, setSouthMonthlyData] = useState([]);
  const [v2Data, setV2Data] = useState([])

    useEffect(() => {
        axios.get("//localhost:3000/views?id=view1GlobalAnnual").then((response) => {
            setGlobalAnnualData(response.data);
        });
        axios.get("//localhost:3000/views?id=view1GlobalMonthly").then((response) => {
            setGlobalMonthlyData(response.data);
        });
        axios.get("//localhost:3000/views?id=view1NorthAnnual").then((response) => {
            setNorthAnnualData(response.data);
        });
        axios.get("//localhost:3000/views?id=view1NorthMonthly").then((response) => {
            setNorthMonthlyData(response.data);
        });
        axios.get("//localhost:3000/views?id=view1SouthAnnual").then((response) => {
            setSouthAnnualData(response.data);
        });
        axios.get("//localhost:3000/views?id=view1SouthMonthly").then((response) => {
            setSouthMonthlyData(response.data);
        });
        axios.get("//localhost:3000/views?id=view2Main").then((response) => {
            setV2Data(response.data.map(item => {
                return {
                    time: item.time.padStart(4, "0"),
                    anomaly: item.anomaly
                }
            }));
        });
    }, [])


    const chartData = (array, array2, array3, array4, array5, array6, array7) => {
        return {
            datasets: [
                {
                    label: "Global Annual Anomaly",
                    data: array,
                    fill: false,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgba(255, 99, 132, 0.2)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                      },
                      pointRadius: 1,
                },

                {
                    label: "Global Monthly Anomaly",
                    data: array2,
                    fill: false,
                    backgroundColor: "rgb(120, 10, 112)",
                    borderColor: "rgba(120, 10, 112, 0.3)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                      },
                      pointRadius: 1,
                },
                {
                    label: "North Annual Anomaly",
                    data: array3,
                    fill: false,
                    backgroundColor: "rgb(120, 10, 112)",
                    borderColor: "rgba(20, 20, 212, 0.9)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                      },
                      pointRadius: 1,
                },
                {
                    label: "North Monthly Anomaly",
                    data: array4,
                    fill: false,
                    backgroundColor: "rgb(120, 10, 112)",
                    borderColor: "rgba(250, 5, 172, 0.4)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                      },
                      pointRadius: 1,
                },
                {
                    label: "South Annual Anomaly",
                    data: array5,
                    fill: false,
                    backgroundColor: "rgb(120, 10, 112)",
                    borderColor: "rgba(184, 32, 320, 0.5)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                      },
                      pointRadius: 1,
                },
                {
                    label: "South Monthly Anomaly",
                    data: array6,
                    fill: false,
                    backgroundColor: "rgb(200, 100, 70)",
                    borderColor: "rgba(150, 90, 250, 0.7)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                      },
                      pointRadius: 1,
                },
                {
                    label: "Northern Hemisphere 2,000-year temperature reconstruction",
                    data: array7,
                    fill: false,
                    backgroundColor: "rgb(120, 10, 112)",
                    borderColor: "rgba(70, 100, 50, 0.7)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                      },
                      pointRadius: 1,
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
            <Line options={options} data={chartData(globalAnnualData, globalMonthlyData, northAnnualData, northMonthlyData, southAnnualData, southMonthlyData, v2Data)} />
            <Text />
        </div>
    );

}