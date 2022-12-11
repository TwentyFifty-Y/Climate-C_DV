import React from "react";
import { Chart } from "chart.js/auto";
import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';

export default function V3() {

    function addLeadingZeros(num, totalLength) {
        if (num < 0) {
            const withoutMinus = String(num).slice(1);
            return '-' + withoutMinus.padStart(totalLength, '0');
        }

        return String(num).padStart(totalLength, '0');
    }

    const Text = () => {
        const [showText, setShowText] = useState(false);
        return (
            <React.Fragment>
                <button className="btn btn-outline-primary btn-info" onClick={() => setShowText(!showText)}>Infos</button>
                <br />
                {showText &&
                    <div>
                        <p className="info-text">Graph displaying the atmospheric CO2 concentrations from Mauna Loa measurements, starting 1958. Data provided from <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" target="_blank" rel="noopener noreferrer">Global Monitoring Laboratory</a>.</p>
                        <p className="info-text">It also shows the Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurement. Data provided from <a href="https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html" target="_blank" rel="noopener noreferrer">the CDIAC</a>.</p>
                        <p className="info-text">The dots represent events related to the Human evolution. Data provided from <a href="https://www.southampton.ac.uk/~cpd/history.html" target="_blank" rel="noopener noreferrer">the CDIAC (Carbon Dioxide Information Analysis Center)</a>.</p>
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
    const [v10ForV3, setV10ForV3]= useState([])

    const LINK = "//localhost:3000";

    function view4Handler(array) {
        let data = array.map((item) => {
            return {
                time: item.airAgeYear,
                mean: item.co2ppm
            }
        });
        return data;
    }
    function view10ForV3Handler(array){
        {
            let data = array.map((item) => {
                const yearRaw = addLeadingZeros((item.yearsFromZero), 6)
                const year = Number(yearRaw).toFixed(0)
                return {
                    time: year,
                    mean: 275,
                    description: item.description
                }
            })
            return data;
        }
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
        axios.get(LINK+ "/views?id=view10Short").then((response)=> {
            setV10ForV3(view10ForV3Handler(response.data));
        })

    }, [])

    const chartData = (view3Annual, view3Monthly, view4SampleOne, view4SampleTwo, view4SampleThree, v10ForV3 ) => {
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
                },
                {
                    label: "Human evolution events",
                    data: v10ForV3,
                    fill: false,
                    backgroundColor: "rgb(184, 46, 113)",
                    borderColor: "rgb(184, 46, 113)",
                    parsing: {
                        xAxisKey: "time",
                        yAxisKey: "mean",
                        descriptionKey: "description",
                    },
                    pointRadius: 3,
                    borderWidth: 0,
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
            tooltip: {
                callbacks: {
                    label: function (context) {
                        console.log(context)
                        if (context.raw.description) {
                            return context.raw.description;
                        } else {
                            return context.raw.mean
                        }
                    }
                }
            }
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
        <div className="view-canvas">
            <Line data={chartData(maunaLoaAnnualData, maunaLoaMonthly, v4SampleOne, v4SampleTwo, v4SampleThree,v10ForV3)} options={options} />
            <Text />
        </div>
    );
}