import React,{useState,useEffect} from "react";
import { Line } from "react-chartjs-2";
//Use the chartjs@2.9 not the latest one
import numeral from "numeral";

const options = {
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
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },

    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat:"ll",
                },
            },
        ],
        yAxes: [
            {
                girdLines: {
                    display:false,
                },
                ticks: {
                    //Include a dollar sign in the ticks
                    callback: function (value, index, values){
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const buildChartData = (data,casesType) => {
    let chartData =[];
    let lastDataPoint;
    
    for(let date in data.cases){
        if(lastDataPoint){
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
function LineGraph({casesType='cases'}) {
    const[data, setData]=useState({});
    
    useEffect(()=> {
        const fetchData = async () => {
             await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`).then((response) => response.json()).then( (data) =>{
            let chartData = buildChartData(data,"cases");
            setData(chartData);
        });
        };

        fetchData();
        
    }, [casesType]);

    
    return (
        <div>
            <h1>I am Parthib</h1>
            {data?.length > 0 && (
                <Line 
                options={options}
                data={{
                    datasets: [
                        {
                            backgroundColor: "rgba(204, 16, 52, 0.5",
                            borderColor:"#CC1034",
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
