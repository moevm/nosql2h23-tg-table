import React, {useEffect, useState} from 'react';
import BaseDialog from "../base_dialog";
import Graph from "../graph";
import login from "../login";

const PlotDialog = (props) => {
    const downloadGraph = async ()=>{
        const data = requests.dates.map((e,ind)=> {
            return `${formatDate(e)} : ${requests.requestCount[ind]}`
        })
        const blob = new Blob([data.join('\n')],{type : 'text/plain'})
        const a = document.createElement('a');
        a.download = `graph.txt`
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
    }

    const formatDate = (date)=>{
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    }
    const createDataset = (reqs)=>{
        let dates = reqs.map(e=>e.timestamp)
        dates = dates.filter((date, i, self) =>
            self.findIndex(d => {
                return d.getTime() === date.getTime()
            }) === i
        )
        dates = Array.from(dates).sort((a,b)=>{
            return a.getTime()-b.getTime()
        })
        const newRequests = {
            dates: dates,
            requestCount: dates.map(item => (reqs.filter(e => e.timestamp.getTime() === item.getTime())).length)
        }
        return newRequests;
    }
    const [requests, setRequests] = useState({dates:[], requestsCount: []})
    useEffect(() => {
        setRequests(createDataset(props.requests))
    }, [props]);
    return (
        <div>
            <BaseDialog visible={props.visible} setVisible={props.setVisible}>
                <span>
                    График статистики посещений
                </span>
                <Graph
                    dates = {requests.dates.map(e=>formatDate(e))}
                    data = {requests.requestCount}
                />
                <div style={{display:"flex", flexDirection:"row",marginTop:20}}>
                    <button
                        className='defaultButton'
                        style={{background: '#1A4297', marginTop: 15, marginRight:"auto", fontSize: 18, minWidth: 100}}
                        onClick={()=>{props.setVisible(false)}}
                    >
                        Назад
                    </button>
                    <button
                        className='defaultButton'
                        style={{marginTop: 15, marginLeft:"auto", fontSize: 18, minWidth: 100}}
                        onClick={downloadGraph}
                    >
                        Сохранить
                    </button>
                </div>
            </BaseDialog>
        </div>
    );
};

export default PlotDialog;