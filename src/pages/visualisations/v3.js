import React from "react"
import { useState, useEffect } from "react"
import { Chart } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';

export default function V3() {

    const Text = () => {
        const [showText, setShowText] = useState(false);
        return (
            <React.Fragment>
                <button className="btn btn-outline-primary btn-info" onClick={() => setShowText(!showText)}>Infos</button>
                <br />
                {showText &&
                    <div>
                        <p className="info-text">. Data provided from <a href=""></a></p>
                    </div>
                }

            </React.Fragment>
        );
    };

    const [maunaLoaAnnualData, setMaunaLoaAnnualData] = useState([]);
    const [maunaLoaMonthly, setMaunaLoaMonthly] = useState([]);
    const [v4SampleOne, setV4SampleOne] = useState([]);
    const [v4SampleTwo, setV4SampleTwo] = useState([]);
    const [v4SampleThree, setV4SampleThree] = useState([]);

    const LINK = "//localhost:3000";

    // function view4Handler(array) {
    //     let data = array.map((item) => {
    //         const yearRaw = Math.abs(1950 - Number(item.airAgeYear));
    //         console.log(typeof yearRaw);
    //         const year = "-" + Number(yearRaw).padStart(6, "0");
    //         return {
    //             time: year,
    //             mean: item.co2ppm
    //         }
    //     })
    //     return data;
    // }

    function view4Handler(array) {
        let data = array.map((item) => {
            return {
                time: item.airAgeYear,
                mean: item.co2ppm
            }
        });
        return data;
    }

    useEffect(() => {
        axios.get(LINK + "/views?id=view3Annual").then((response) => {
            setMaunaLoaAnnualData(response.data);
        });

        axios.get(LINK + "/views?id=view3Monthly").then((response) => {
            setMaunaLoaMonthly(response.data.map((item) => {
                return {
                    time: item.year + "-" + item.month.padStart(2, "0"),
                    mean: item.mean
                }
            }));
        });
        axios.get(LINK + "/views?id=view4SampleOne").then((response) => {
            setV4SampleOne(view4Handler(response.data));
        });
        axios.get(LINK + "/views?id=view4SampleTwo").then((response) => {
            setV4SampleTwo(view4Handler(response.data));
        });
        axios.get(LINK + "/views?id=view4SampleThree").then((response) => {
            setV4SampleThree(view4Handler(response.data));
        });

    }, [])

    const chartData = (view3Annual, view3Monthly, view4SampleOne, view4SampleTwo, view4SampleThree) => {
        return {
            datasets: [
                {
                    label: "Mauna Loa Annual Atmospheric CO2 Concentration",
                    data: view3Annual,
                    fill: false,
                    backgroundColor: "rgb(55, 87, 62)",
                    borderColor: "rgb(55, 87, 62)",
                    parsing: {
                        xAxisKey: "year",
                        yAxisKey: "mean",
                    },
                    pointRadius: 0,

                },
                {
                    label: "Mauna Loa Monthly Atmospheric CO2 Concentration",
                    data: view3Monthly,
                    fill: false,
                    backgroundColor: "rgb(141, 233, 105)",
                    borderColor: "rgb(141, 233, 105)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "mean",
                    },
                    pointRadius: 0,
                },
                {
                    label: "Ice Core Sample 1",
                    data: view4SampleOne,
                    fill: false,
                    backgroundColor: "rgb(132, 169, 192)",
                    borderColor: "rgb(132, 169, 192)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "mean",
                    },
                    pointRadius: 0,
                },
                {
                    label: "Ice Core Sample 2",
                    data: view4SampleTwo,
                    fill: false,
                    backgroundColor: "rgb(106, 102, 163)",
                    borderColor: "rgb(106, 102, 163)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "mean",
                    },
                    pointRadius: 0,
                },
                {
                    label: "Ice Core Sample 3",
                    data: view4SampleThree,
                    fill: false,
                    backgroundColor: "rgb(84, 46, 113)",
                    borderColor: "rgb(84, 46, 113)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "mean",
                    },
                    pointRadius: 0,
                }
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
                text: "Mauna Loa CO2 Atmospheric Concentration Data",
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
            <Line data={chartData(maunaLoaAnnualData, maunaLoaMonthly, v4SampleOne, v4SampleTwo, v4SampleThree)} options={options} />
            <Text />
        </div>
    );
}