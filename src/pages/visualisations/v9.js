import React from "react";
import { Chart } from "chart.js/auto";
import { useState, useEffect, useRef } from "react";
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';
var randomColor = require('randomcolor');

export default function V9() {

    const [sectorData, setSectorData] = useState([]);
    const [subSectorData, setSubSectorData] = useState([]);
    const [infraSubSectorData, setInfraSubSectorData] = useState([]);

    const chartRef = useRef(null);

    const LINK = "//express.twentyfifty-y.com";

    const Text = () => {
        const [showText, setShowText] = useState(false);

        return (

            <React.Fragment>
                <button className="btn btn-outline-primary btn-info" onClick={() => setShowText(!showText)}>Infos</button>
                <br />
                {showText &&
                    <div>
                        <p className="info-text">This pie chart displays CO2 emissions by sectors. Data provided from <a href="https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector" target="_blank" rel="noopener noreferrer">Our World in Data</a>.</p>
                    </div>
                }
            </React.Fragment>
        )
    };

    useEffect(() => {
        axios.get(LINK + "/views?id=view9Main").then((response) => {
            setSectorData(response.data.sector);
            setSubSectorData(response.data.subSector);
            setInfraSubSectorData(response.data.infraSubSector);
        });
    }, [])

    const chartData = (dataArray) => {
        return {
            labels: dataArray.map((item) => {
                return item.sector;
            }),
            datasets: [{
                label: 'Global Emissions by Sector',
                data: dataArray.map((item) => {
                    return item.percent;
                }),
                ids: dataArray.map((item) => {
                    return item.id
                }),
                backgroundColor: randomColor({
                    count: 4,
                    hue: 'red'
                }),
            }]
        }
    }

    let sync = 0;
    let id;
    const options = {
        plugins: {
            title: {
                display: true,
                text: "CO2 emissions by sector",
            },
        },
        //add a click event to the chart
        onClick: (event, elements) => {
            //if the click is on a bar
            if (elements.length > 0) {
                //get the index of the bar
                const index = elements[0].index;
                console.log(elements[0].index)
                //get the chart
                const chart = chartRef.current;

                function chartReset(chart) {
                    //set the labels
                    chart.config._config.data.labels = sectorData.map((item) => {
                        return item.sector;
                    })
                    //set the data
                    chart.config._config.data.datasets[0].data = sectorData.map((item) => {
                        return item.percent;
                    })
                }

                function chartUpdate(chart, data, id) {
                    //change the labels
                    chart.config._config.data.labels = data[id].map((item) => {
                        return item.subSector;
                    })
                    //change the data
                    chart.config._config.data.datasets[0].data = data[id].map((item) => {
                        return item.percent;
                    })
                    //change the ids
                    chart.config._config.data.datasets[0].ids = data[id].map((item) => {
                        return item.id;
                    })
                }

                switch (sync) {
                    case 0:
                        id = sectorData[index].id
                        console.log(id)
                        chartUpdate(chart, subSectorData, id);
                        chart.update();
                        sync = 1;
                        break;
                    case 1:
                        console.log(subSectorData)
                        console.log(id)
                        console.log(index)

                        if (id === "energy") {
                            id = subSectorData[id][index].id

                            if (id) {
                                chartUpdate(chart, infraSubSectorData, id);
                                chart.update();
                                sync = 2;
                            } else {
                                sync = 1;
                                id = "energy"
                            }
                        } else {
                            chartReset(chart);
                            chart.update();
                            sync = 0;
                        }
                        break;
                    case 2:
                        chartReset(chart);
                        chart.update();
                        sync = 0;
                        break;
                    default:
                        break;
                }
            }
        }
    };

    return (
        <div className="view-canvas doughnut-chart">
            <Doughnut ref={chartRef} data={chartData(sectorData)} options={options} />
            <Text />
        </div>
    );

}