import React, { useState, useEffect } from 'react';
import { Chart } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';

var randomColor = require('randomcolor');

export default function V8() {

    function view8Handler(json) {
        let newJson = [];

        json.map((item) => {
            for (var key in item) {
                //make newJson be an array of country: key, except if country: key is already there, except for Year
                if (key !== 'Year' && newJson.filter((i) => { return i.country === key }).length === 0) {
                    newJson.push({
                        country: key, data: json.map((i) => {
                            //make data be an array of objects with year: i.Year and value: i[key]
                            return { year: i.Year, value: (Number(i[key]) * 3.644) }
                        })
                    });
                }
            }
        })

        return newJson;
    }

    const Text = () => {
        const [showText, setShowText] = useState(false);

        return (

            <React.Fragment>
                <button className="btn btn-outline-primary btn-info" onClick={() => setShowText(!showText)}>Infos</button>
                <br />
                {showText &&
                    <div>
                        <p className="info-text"></p>
                        <p className="info-text"> This line graph shows the changes in the atmospheric co2 concentrations in ice cores
                            in the southern hemisphere for the past 800 000 years. <br />
                            Data is from <a href="https://www.ncei.noaa.gov/access/paleo-search/study/17975">National Centersfor Environmental Information</a></p>
                    </div>
                }

            </React.Fragment>
        )
    };

    const [v8Data, setV8Data] = useState([]);
    const LINK = "//localhost:3000";

    useEffect(() => {
        axios.get(LINK + "/views?id=view8Main").then((response) => {
            setV8Data(view8Handler(response.data));
        })
    }, [])

    const chartData = (v8Data) => {
        return {
            datasets: v8Data.map((item) => {
                let color = randomColor();
                return {
                    label: item.country,
                    data: item.data.map((i) => {
                        return { x: i.year, y: i.value }
                    }),
                    borderColor: color,
                    backgroundColor: color,
                    fill: false,
                    pointRadius: 0,
                    borderWidth: 1,
                    fill: true
                }
            })
            // label: "Atmospheric co2 concentrations in ice cores in the southern hemisphere",
            //     data: v6Data,
            //         borderColor: "rgba(55, 87, 62)",
            //             backgroundColor: "rgb(55, 87, 62)",
            //                 parsing: {
            //     xAxisKey: "time",
            //         yAxisKey: "mean",
            //     },
            // pointRadius: 0,
            //     borderWidth: 1,
            //         yAxisID: "yAxis"
        }
    }

    const options = {
        animation: false,
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    boxWidth: 10,
                    font: {
                        size: 10
                    }
                }
            },
            title: {
                display: true,
                text: "CO2 emissions by country",
            },
        },
        scales: {
            xAxis: {
                type: "linear",
                position: "bottom",
                min: 1959,
            },
            yAxis: {
                type: "linear",
                position: "left",
                stacked: true,
            }
        },
    };

    //return v8Data looped through and create a line chart for each country
    return (
        <div /*style={{ width: "1000px" }}*/ className="view-canvas">
            <Line options={options} data={chartData(v8Data)} />
            <Text />
        </div>
    );
}