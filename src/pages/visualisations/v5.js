import React from "react";
import { Chart } from "chart.js/auto";
import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';

export default function V5() {

    function addLeadingZeros(num, totalLength) {
        if (num < 0) {
            const withoutMinus = String(num).slice(1);
            return '-' + withoutMinus.padStart(totalLength, '0');
        }

        return String(num).padStart(totalLength, '0');
    }

    function view5Handler(array) {
        let data = array.map((item) => {
            const yearRaw = addLeadingZeros((1950 - item.airAgeYearBeforePresent), 6)
            var year;
            if (yearRaw < 0) {
                year = Number(yearRaw * -1).toFixed(0) + ' BC'
            } else {
                year = Number(yearRaw).toFixed(0) + ' AD'
            }
            return {
                time: year,
                mean: item.co2ppm
            }
        })
        return data;
    }

    const Text = () => {
        const [showText, setShowText] = useState();
        return (
            <React.Fragment>
                <button className="btn btn-outline-primary btn-info" onClick={() => setShowText(!showText)}>Infos</button>
                <br />
                {showText &&
                    <div>
                        <p className="info-text">Historical Carbon Dioxide Record from the Vostok Ice Core.
                         Data provided from <a href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html" target="_blank" rel="noopener noreferrer">CDIAC</a>.</p>
                    </div>
                }
            </React.Fragment>
        );
    };

    const [v5Data, setV5Data] = useState([])

    const LINK = "//express.twentyfifty-y.com";

    useEffect(() => {
        axios.get(LINK + "/views?id=view5Main").then((response) => {
            setV5Data(view5Handler(response.data));
        });
    }, []) 

    const chartData = (v5Data) => {

        return {
            datasets: [
                {
                    label: "Global Annual Anomaly",
                    data: v5Data,
                    fill: false,
                    backgroundColor: "rgb(163, 0, 0)",
                    borderColor: "rgb(163, 0, 0)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "mean",
                    },
                    pointRadius: 0,
                    borderWidth: 2,
                },
            ]
        }
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
                text: "Vostok Ice Core CO2 measurements, 417160 - 2342 years",
            },
        },
        scales: {
            xAxis: {
                reverse: true,               
            },
            yAxis: {
                type: "linear",
            },
        },
    };
    
    return (
        <div className="view-canvas">
            <Line data={chartData(v5Data)} options={options} />
            <Text />
        </div>
    );
}