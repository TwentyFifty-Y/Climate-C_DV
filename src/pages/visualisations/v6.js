import React, { useState, useEffect } from 'react';
import { Chart } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';

export default function V6() {

    function addLeadingZeros(num, totalLength) {
        if (num < 0) {
            const withoutMinus = String(num).slice(1);
            return '-' + withoutMinus.padStart(totalLength, '0');
        }

        return String(num).padStart(totalLength, '0');
    }

    function view6Handler(array) {
        let data = array.map((item) => {
            const yearRaw = addLeadingZeros((1950 - item.gasAgeYearBeforePresent), 6)
            const year = Number(yearRaw).toFixed(0)
            return {
                time: year,
                mean: item.co2ppm
            }
        })
        return data;
    }

    function view7Handler(array) {
        let data = array.map((item) => {
            const yearRaw = addLeadingZeros((1950 - (item.time*1000)), 6)
            const year = Number(yearRaw).toFixed(0)
            return {
                time: year,
                anomaly: item.anomaly
            }
        })
        return data;
    }

    function view10Handler(array) {
        let data = array.map((item) => {
            const yearRaw =item.yearsFromZero
            var year;
            if (yearRaw < 0) {
                year = Number(yearRaw * -1).toFixed(0) + ' BC'
            } else {
                year = Number(yearRaw).toFixed(0) + ' AD'
            }
            return {
                time: year,
                mean: item.description
            }
        })
        return data;
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
                            Data is from <a href="https://www.ncei.noaa.gov/access/paleo-search/study/17975">National Centers for Environmental Information</a></p>
                    </div>
                }

            </React.Fragment>
        )
    };

    const [v6Data, setv6Data] = useState([]);
    const [v7Data, setV7Data] = useState([]);
    const [v10Data, setV10Data] = useState([]);
    const LINK = "//localhost:3000";

    useEffect(() => {
        axios.get(LINK + "/views?id=view6Main").then((response) => {
            setv6Data(view6Handler(response.data));
        })

        axios.get(LINK + "/views?id=view7Main").then((response) => {
            setV7Data(view7Handler(response.data));
        })

        axios.get(LINK +"/views?id=view10Main").then((response)=>{
            setV10Data(view10Handler(response.data));
        })

    }, [])



    const chartData = (v6Data, v7Data, v10Data) => {
        return {
            datasets: [
                {
                    label: "Atmospheric co2 concentrations in ice cores in the southern hemisphere",
                    data: v6Data,
                    borderColor: "rgba(55, 87, 62)",
                    backgroundColor: "rgb(55, 87, 62)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "mean",
                    },
                    pointRadius: 0,
                    borderWidth: 1,
                    yAxisID: "yAxis"
                },
                {
                    label: "Evolution of global temperature over the past two million years",
                    data: v7Data,
                    borderColor: "rgba(80, 140, 164)",
                    backgroundColor: "rgb(80, 140, 164)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomaly",
                    },
                    pointRadius: 0,
                    borderWidth: 1,
                    yAxisID: "yAxis2"
                },
                {
                    label: "Human evolution events",
                    data: v10Data,
                    backgroundColor: "rgb(163, 0, 0)",
                    borderColor: "rgb(163, 0, 0)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: ""
                    },
                    pointRadius: 0,
                    borderWidth: 1
                }
            ],

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
                text: "Ice core 800k year composite study CO2 measurements",
            },
        },
        scales: {
            xAxis: {
                type: "linear",
                // type: "time",
                // time: {
                //     unit: "year",
                //     stepSize: 10
                // },
                max: new Date().getFullYear(),
                ticks: {
                    // Include appropriate year labels
                    callback: function(value, index, ticks) {
                        //If the number is negative, make it positive and add BC, otherwise add AD
                        if (value < 0) {
                            return Math.abs(value) + " BC";
                        } else {
                            return value + " AD";
                        }
                    }
                }
            },
            yAxis: {
                type: "linear",
                position: "left",
                
            },
            yAxis2: {
                type: "linear",
                position: "right",
                grid: {
                    display: false
                },
            },
            

        },
    };
    return (
        <div /*style={{ width: "1000px" }}*/ className="view-canvas">
            <Line options={options} data={chartData(v6Data, v7Data, v10Data)} />
            <Text />
        </div>
    );
}
