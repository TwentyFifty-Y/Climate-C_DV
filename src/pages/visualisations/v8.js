import React, { useState, useEffect } from 'react';
import { Chart } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-luxon';

export default function V8() {

    function view8Handler(json) {
        let newJson = [];

        json.map((item) => {
            for (var key in item) {
                //make newJson be an array of country: key, except if country: key is already there, except for Year
                if (key !== 'Year' && newJson.filter((i) => { return i.country === key }).length === 0) {
                    newJson.push({
                        country: key, data: json.map((i) => {
                            //make data be an array of objects with year: i.Year and value: i[key]
                            return { year: i.Year, value: i[key] }
                        })
                    });
                }
            }
        })

        return newJson;
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
                            Data is from <a href="https://www.ncei.noaa.gov/access/paleo-search/study/17975">National Centersfor Environmental Information</a></p>
                    </div>
                }

            </React.Fragment>
        )
    };

    const [v8Data, setV8Data] = useState([]);
    const LINK = "//localhost:3000";

    useEffect(() => {
        axios.get(LINK + "/views?id=view8Main").then((response) => {
            setV8Data(view8Handler(response.data));
        })
    }, [])

    //return v8Data looped through and create a line chart for each country
    return (
        <div>
            <Text />
            {v8Data.map((item) => {
                return (
                    <div>
                        <h2>{item.country}</h2>
                        <Line
                            data={{
                                datasets: [{
                                    label: item.country,
                                    data: item.data,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1,
                                    parsing: {
                                        xAxisKey: "year",
                                        yAxisKey: "value",
                                    },
                                }]
                            }}
                            options={{
                                scales: {
                                    x: {
                                        type: 'linear',
                                        position: 'bottom',
                                        title: {
                                            display: true,
                                            text: 'Year'
                                        }
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Value'
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}