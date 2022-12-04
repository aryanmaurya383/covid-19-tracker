import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import './LineGraph.css';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from "chart.js";
ChartJS.register(
    Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler
)

const options = {
    pointRadius: 0,
    fill: true,
    plugins: {

        legend: {
            display: false,
        },
        elements: {
            point: {
                radius: 0,
            },

        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersect: false,
            callBacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },

    },
    scales: {
        x: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        y: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Includes a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],

    },

};

const buildChartData = (data, casesType = 'cases') => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

function LineGraph({ casesType = 'cases', ...props }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                });
        };

        fetchData();
    }, [casesType]);


    return (
        <div className={props.className}>
            {data?.length > 0 && (
                < Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                fill: true,
                                borderColor: "#CC1034",
                                data: data,
                            },
                        ],
                    }}
                />
            )}
        </div>
    )
}

export default LineGraph
