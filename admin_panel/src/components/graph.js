import React, {useEffect, useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function Graph(props){
    const [data,setData] = useState({ labels: [], datasets: [{ data: [] }] });
    useEffect(() => {
        setData({
            labels: props.dates,
            datasets: [{
                label: "Обращения",
                backgroundColor: 'rgba(40, 96, 173, 1)',
                borderColor: 'rgba(40, 96, 173, 1)',
                borderWidth: 1,
                data: props.data,
            }]
        });
    }, [props]);
    let options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return(
        <div style={{background:"white",minWidth: 500, marginTop: 15}}>
            <Line data={data} options={options}/>
        </div>
    )
}

export default Graph;