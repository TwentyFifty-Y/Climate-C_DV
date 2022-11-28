import React, { useState, useEffect } from 'react';
import { Chart } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';

export default function V6() {
    const [showText, setShowText] = useState(false);
    return (
        <React.Fragment>
            <button className="btn btn-outline-primary btn-info" onClick={() => setShowText(!showText)}>Infos</button>
            <br />
            {showText &&
                <div>
                    <p className="info-text"></p>
                    <p className="info-text"> Data provided in <a href=""></a></p>
                </div>
            }

        </React.Fragment>
    );

    const [v6Data, setv6Data] = useState([]);

    const LINK = "//localhost:3000";

    useEffect(() => {
        axios.get(LINK + "/views?id=view6Main").then((response) => {
            setv6Data(response.data);
        });

    }, []);
    
    const chartData = (v6Data)
    return {
        datasets: [
            {
                label: "Ice core 800k year composite study CO2 measurements",
                data: v6Data,
                borderColor: "rgba(55, 87, 62)",
                backgroundColor: "rgb(55, 87, 62)",
                parsing: {
                    xAxisKey: "time",
                    yAxisKey: "co2ppm ",
                },
                pointRadius: 0,
                borderWidth: 1,
               }]
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
                text: "Time Line Graph Demonstration",
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
            <h1>Hopefully v6</h1>
            <Line options={options} data={(v6Data)} />
            <Text />
        </div>
    );
}
