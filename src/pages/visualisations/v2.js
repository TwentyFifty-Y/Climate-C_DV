import React, { useState, useEffect } from 'react';
import { Chart } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';

export default function V2() {

    const Text = () => {
        const [showText, setShowText] = useState(false);
        return (
            <React.Fragment>
                <button className="btn btn-outline-primary btn-info" onClick={() => setShowText(!showText)}>Infos</button>
                <br />
                {showText &&
                    <div>
                        <p className="info-text">Graph that displays historical surface temperature anomalies relative to a 1961-1990 reference period globally and by hemisphere, also with monthly an annual data. Data provided from <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/" target="_blank" rel="noopener noreferrer">HadCRUT5</a></p>
                        <p className="info-text">It also displays Northern Hemisphere temperature reconstruction for the past 2,000 years. Data provided by <a href="https://bolin.su.se/data/moberg-2012-nh-1?n=moberg-2005" target="_blank" rel="noopener noreferrer">Bolin Centre for Climate Research</a></p>
                    </div>
                }
            </React.Fragment>
        );
    };

    const [globalAnnualData, setGlobalAnnualData] = useState([]);
    const [globalMonthlyData, setGlobalMonthlyData] = useState([]);
    const [northMonthlyData, setNorthMonthlyData] = useState([]);
    const [northAnnualData, setNorthAnnualData] = useState([]);
    const [southAnnualData, setSouthAnnualData] = useState([]);
    const [southMonthlyData, setSouthMonthlyData] = useState([]);
    const [v2Data, setV2Data] = useState([])

    const LINK = "//express.twentyfifty-y.com";

    useEffect(() => {
        axios.get(LINK + "/views?id=view1GlobalAnnual").then((response) => {
            setGlobalAnnualData(response.data);
        });
        axios.get(LINK + "/views?id=view1GlobalMonthly").then((response) => {
            setGlobalMonthlyData(response.data);
        });
        axios.get(LINK + "/views?id=view1NorthAnnual").then((response) => {
            setNorthAnnualData(response.data);
        });
        axios.get(LINK + "/views?id=view1NorthMonthly").then((response) => {
            setNorthMonthlyData(response.data);
        });
        axios.get(LINK + "/views?id=view1SouthAnnual").then((response) => {
            setSouthAnnualData(response.data);
        });
        axios.get(LINK + "/views?id=view1SouthMonthly").then((response) => {
            setSouthMonthlyData(response.data);
        });
        axios.get(LINK + "/views?id=view2Main").then((response) => {
            setV2Data(response.data.map(item => {
                return {
                    time: item.time.padStart(4, "0"),
                    anomaly: item.anomaly
                }
            }));
        });
    }, [])

    const chartData = (globalAnnualData, globalMonthlyData, northAnnualData, northMonthlyData, southAnnualData, southMonthlyData, view2Data) => {
        return {
            datasets: [
                {
                    label: "Global Annual Anomaly",
                    data: globalAnnualData,
                    fill: false,
                    backgroundColor: "rgb(163, 0, 0)",
                    borderColor: "rgb(163, 0, 0)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                    },
                    pointRadius: 0,
                    borderWidth: 2,
                },
                {
                    label: "Global Monthly Anomaly",
                    data: globalMonthlyData,
                    fill: false,
                    backgroundColor: "rgb(163, 0, 0, 0.2)",
                    borderColor: "rgb(163, 0, 0, 0.2)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                    },
                    pointRadius: 0,
                    borderWidth: 1,
                },
                {
                    label: "North Annual Anomaly",
                    data: northAnnualData,
                    fill: false,
                    backgroundColor: "rgb(10, 46, 69)",
                    borderColor: "rgb(10, 46, 69)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                    },
                    pointRadius: 0,
                    borderWidth: 2,
                },
                {
                    label: "North Monthly Anomaly",
                    data: northMonthlyData,
                    fill: false,
                    backgroundColor: "rgb(10, 46, 69, 0.2)",
                    borderColor: "rgb(10, 46, 69, 0.2)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                    },
                    pointRadius: 0,
                    borderWidth: 1,
                },
                {
                    label: "South Annual Anomaly",
                    data: southAnnualData,
                    fill: false,
                    backgroundColor: "rgb(98, 168, 124)",
                    borderColor: "rgb(98, 168, 124)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                    },
                    pointRadius: 0,
                    borderWidth: 2,
                },
                {
                    label: "South Monthly Anomaly",
                    data: southMonthlyData,
                    fill: false,
                    backgroundColor: "rgb(98, 168, 124, 0.2)",
                    borderColor: "rgb(98, 168, 124, 0.2)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                    },
                    pointRadius: 0,
                    borderWidth: 1,
                },
                {
                    label: "Northern Hemisphere 2,000-year temperature reconstruction",
                    data: view2Data,
                    fill: false,
                    borderColor: "rgba(55, 87, 62)",
                    backgroundColor: "rgb(55, 87, 62)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                    },
                    pointRadius: 0,
                    borderWidth: 1,
                },
            ],
        };
    }

    const options = {
        animation: false,
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Global historical surface temperature anomalies",
            },
        },
        scales: {
            xAxis: {
                type: "time",
                time: {
                    unit: "year",
                },
            },
            yAxis: {
                type: "linear",
            },
        },
    };

    return (
        <div className="view-canvas">
            <Line options={options} data={chartData(globalAnnualData, globalMonthlyData, northAnnualData, northMonthlyData, southAnnualData, southMonthlyData, v2Data)} />
            <Text />
        </div>
    );

}