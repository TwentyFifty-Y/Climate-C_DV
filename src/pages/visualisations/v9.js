import React from "react"
import { useState, useEffect } from "react"
import { Chart } from "chart.js/auto";
import { Line, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';
var randomColor = require('randomcolor');

export default function V9() {

    const [v9Data, setV9Data] = useState([]);
    const LINK = "//localhost:3000";


    function view9Handler(array) {
        let data = array.map((item) => {
            return {
                sector: item.sector,
                percent: item.globalEmissionsPercentage,
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
            setV9Data(view9Handler(response.data.sector));
        });
    }, [])


    const chartData = (v9Data) => {

        return {
            labels: v9Data.map((item) => {
                return item.sector;
            }),
            datasets: [{
                label: 'Global Emissions by Sector',
                data: v9Data.map((item) => {
                    return item.percent;
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
                const label = chartData(v9Data).labels[index];
                //get the value of the bar
                const value = chartData(v9Data).datasets[0].data[index];
                //show an alert with the label and value
                console.log(chartData(v9Data))
            }
        }
    };

    return (
        <div /*style={{ width: "1000px" }}*/ className="view-canvas doughnut-chart">
            <Doughnut data={chartData(v9Data)} options={options} />
            <Text />
        </div>
    );

}