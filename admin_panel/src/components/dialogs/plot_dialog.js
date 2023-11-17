import React, {useEffect, useState} from 'react';
import BaseDialog from "../base_dialog";
import Graph from "../graph";

const PlotDialog = (props) => {
    const formatDate = (date)=>{
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    }
    const createDataset = (reqs)=>{
        let dates = reqs.map(e=>e.time)
        dates = dates.filter((date, i, self) =>
            self.findIndex(d => d.getTime() === date.getTime()) === i
        )
        dates = Array.from(dates).sort((a,b)=>{
            return a.getTime()-b.getTime()
        })
        const newRequests = {
            dates: dates,
            requestCount : dates.map(item=>(reqs.filter(e=>e.time.getTime()===item.getTime())).length)
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
                    >
                        Сохранить
                    </button>
                </div>
            </BaseDialog>
        </div>
    );
};

export default PlotDialog;