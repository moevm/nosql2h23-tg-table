import React, {useEffect, useState} from 'react';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SearchIcon from '@mui/icons-material/Search';
import PlotDialog from "./dialogs/plot_dialog";
import _ from "lodash";

const Statistics = (props) => {
    useEffect(()=>{
        props.setTitle("Статистика")
    })

    useEffect(()=>{
        fetch(`http://localhost:8000/requests`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                const requestsWithCorrectTime = data.map(e=>{
                    return {...e,timestamp:new Date(e.timestamp)}
                })
                setRequests(requestsWithCorrectTime)
                setCurrentRequests(requestsWithCorrectTime)
            })
    },[])

    const MenuPage = () => {
        window.location.href='/menu';
    }

    const filterParams = [{
        name: "Все",
        value: ""
    }, {
        name: "Время",
        value: "timestamp"
    }, {
        name: "Группа",
        value: "groupNumber"
    }, {
        name: "ФИО",
        value: "student.studentName"
    }, {
        name: "Таблица",
        value: "spreadsheet.spreadsheetName"
    }]

    const [requests,setRequests] = useState([])
    const [currentRequests, setCurrentRequests] = useState([])
    const [currentFilter, setCurrentFilter] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [isPlotVisible, setIsPlotVisible] = useState(false)

    const resetFilter = ()=>{
        setCurrentFilter("")
        setSearchValue("")
    }

    const filterRequests = ()=>{
        let newRequests;
        if (searchValue.length>0){
            newRequests = [...requests].filter(e=>{
                // e[currentFilter].toString().
                if (currentFilter==='timestamp'){
                    return `${_.get(e,`${currentFilter}`).toLocaleDateString()} ${_.get(e,`${currentFilter}`).toLocaleTimeString()}`.includes(searchValue)
                }
                return  _.get(e,`${currentFilter}`).toString().includes(searchValue)
            })
        } else {
            newRequests = requests
        }
        setCurrentRequests(newRequests)
    }

    return (
        <div >
            <PlotDialog
                visible={isPlotVisible}
                setVisible={setIsPlotVisible}
                requests={currentRequests}
            />
            <div style={{display:"flex",flexDirection:"row"}}>
                <div className="params">
                    <span>Параметр:</span>
                    <select id="select_stat" style={{marginLeft: 10, fontSize: 18}} value={currentFilter} onChange={(event)=>{
                        setCurrentFilter(event.target.value)
                        if (event.target.value===""){
                            setCurrentRequests(requests)
                        }
                    }}>
                        {filterParams.map(e=>
                            <option key={e.value} value={e.value}>
                                {e.name}
                            </option>
                        )}
                    </select>
                </div>
                {currentFilter === "" ?
                    null :
                    <div className="params" style={{marginLeft:0, padding: 0}}>
                        <input className="myInput"
                               style={{width:200,fontSize:18,paddingTop:0}}
                               value={searchValue}
                               onChange={(e)=>{setSearchValue(e.target.value)}}/>
                        <SearchIcon style={{verticalAlign:"middle", cursor:"pointer"}} onClick={filterRequests}/>
                    </div>
                }
            </div>
            <div style={{overflow: "auto",maxHeight:300}}>
                {currentRequests.length>0 ? <table className="MyTable" style={{minWidth:700}}>
                    <thead>
                    <tr>
                        <th>
                            Дата
                        </th>
                        <th>
                            Группа
                        </th>
                        <th>
                            ФИО
                        </th>
                        <th>
                            Таблица
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentRequests.map(request=>
                        <tr key={request._id}>
                            <td>
                                {`${(new Date(request.timestamp)).toLocaleDateString()} ${(new Date(request.timestamp)).toLocaleTimeString()}`}
                            </td>
                            <td>
                                {request.groupNumber}
                            </td>
                            <td>
                                {request.student.studentName}
                            </td>
                            <td>
                                {request.spreadsheet.spreadsheetName}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table> : <span style={{fontSize:30,fontFamily:"Comfortaa",color:"white"}}>Данные не найдены</span>}
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <button
                    className='defaultButton'
                    style={{marginLeft: 60, fontSize: 18, marginTop: 25, paddingLeft: 10, paddingRight: 10}}
                    onClick={()=>setIsPlotVisible(true)}
                >
                    Построить график
                    <AutoGraphIcon style={{color: "gold", marginLeft: 15,verticalAlign:'middle'}}/>
                </button>
                <button
                    className='defaultButton'
                    style={{marginLeft: 60, fontSize: 18, marginTop: 70, paddingLeft: 10, paddingRight: 10}}
                    onClick={MenuPage}
                >
                    Назад
                </button>
            </div>
        </div>
    );
};

export default Statistics;