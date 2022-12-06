import React from "react"
import { useState, useEffect } from "react"
import { Chart } from "chart.js/auto";
import { Line, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';
var randomColor = require('randomcolor');

export default function V9() {

    const [sectorData, setSectorData] = useState([]);
    const [subSectorData, setSubSectorData] = useState([]);
    const [infraSubSectorData, setInfraSubSectorData] = useState([]);
    const LINK = "//localhost:3000";


    function view9SectorHandler(array) {
        let data = array.sector.map((item) => {
            return {
                sector: item.sector,
                percent: item.percent,
                id: item.id
            }
        });
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
                        <p className="info-text"><br />
                            <a href="https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector"></a></p>
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
                ids: dataArray.map((item) =>{
                    return item.id
                }),
                backgroundColor: randomColor({
                    count: 4,
                    hue: 'red'
                }),
            }]
        }

    }
    const options = {
        //add a click event to the chart
        onClick: (event, elements) => {
            //if the click is on a bar
            if (elements.length > 0) {
                //get the index of the bar
                const index = elements[0].index;
                //get the label of the bar
                const label = chartData(sectorData).labels[index];
                //get the value of the bar
                const value = chartData(sectorData).datasets[0].data[index];
                //get the id of the bar
                const id = sectorData[index].id;
                console.log(subSectorData)
                console.log(infraSubSectorData)
                console.log(chartData(sectorData))
                var s = "energy"
                console.log(subSectorData[s])
                //show an alert with the label and value
                alert(`The sector ${label} has ${value}% of the global emissions`);
            }
        }
    };

    return (
        <div /*style={{ width: "1000px" }}*/ className="view-canvas doughnut-chart">
            <Doughnut data={chartData(sectorData)} options={options} />
            <Text />
        </div>
    );

}