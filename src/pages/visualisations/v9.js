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
            datasets: [
                v9Data.map((item) => {
                    let color = randomColor();
                    return {
                        label: item.sector,
                        data: item.data,
                        borderColor: color,
                        backgroundColor: color,
                    }
                })
            ]
        }

    }
    const options = {
        
    };

    return (
        <div /*style={{ width: "1000px" }}*/ className="view-canvas">
            <Doughnut data={chartData(v9Data)} options={options} />
            <Text />
        </div>
    );

}