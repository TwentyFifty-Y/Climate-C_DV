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
                        <p className="info-text"> This stacked line graph shows CO2 emissions of each country over time. <br />
                            Data is from <a href="https://essd.copernicus.org/articles/14/1917/2022/" target="_blank" rel="noopener noreferrer">Earth System Science Data</a>. Data can be accessed through <a href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D" target="_target" rel="noopener noreferrer">here</a>.</p>
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
                let color = randomColor({
                    count: v8Data.length,
                    luminosity: 'light',
                    hue: 'random'
                });
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
        <div className="view-canvas">
            <Line options={options} data={chartData(v8Data)} />
            <Text />
        </div>
    );
}