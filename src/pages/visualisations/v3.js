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

    const LINK = "//localhost:3000";

    useEffect(() => {
        axios.get(LINK + "/views?id=view3Annual").then((response) => {
            setMaunaLoaAnnualData(response.data);
        });

        axios.get(LINK + "/views?id=view3Monthly").then((response) => {
            setMaunaLoaMonthly(response.data.map((item) => {
                return {
                    time: item.year + "-" + item.month,
                    mean: item.mean
                }
            }));
        });
    }, [])

    const chartData = (view3Annual, view3Monthly) => {
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
                    unit: "year",
                },
            },
            yAxis: {
                type: "linear",
            },
        },
    };

    return (
        <div style={{ width: "1000px" }}>
            <Line data={chartData(maunaLoaAnnualData, maunaLoaMonthly)} options={options} />
            <Text />
        </div>
    );
}