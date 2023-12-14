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

    const filterParams = ["timestamp","groupNumber","student.studentName","spreadsheet.spreadsheetName"]

    const [requests,setRequests] = useState([])
    const [currentRequests, setCurrentRequests] = useState([])
    const [isPlotVisible, setIsPlotVisible] = useState(false)
    const [searchValues,setSearchValues] = useState([
        '','',''
    ])
    const [dateFrom,setDateFrom] = useState('')
    const [dateTo,setDateTo] = useState('')

    const setSearchValue = (index,value)=>{
        const newSearchValues = searchValues.map((elem,ind)=>{
            if (ind===index){
                return value
            } else{
                return  elem
            }
        })
        setSearchValues(newSearchValues)
    }

    // const filterRequests = (currentFilter, searchValue)=>{
    //     if (searchValue.length>0){
    //         let newRequests = [...requests].filter(e=>{
    //             // e[currentFilter].toString().
    //             if (currentFilter==='timestamp'){
    //                 return `${_.get(e,`${currentFilter}`).toLocaleDateString()} ${_.get(e,`${currentFilter}`).toLocaleTimeString()}`.includes(searchValue)
    //             }
    //             return  _.get(e,`${currentFilter}`).toString().includes(searchValue)
    //         })
    //         setCurrentRequests(newRequests)
    //     }
    // }

    const filterRequests = ()=>{
        let newRequests = [...currentRequests]
        for (let i=0;i<3;i++){
            if (searchValues[i].length>0){
                const searchValue = searchValues[i]
                const currentFilter = filterParams[i]
                 newRequests= newRequests.filter(e=>{
                    if (currentFilter==='timestamp'){
                        return `${_.get(e,`${currentFilter}`).toLocaleDateString()} ${_.get(e,`${currentFilter}`).toLocaleTimeString()}`.includes(searchValue)
                    }
                    return  _.get(e,`${currentFilter}`).toString().toLowerCase().includes(searchValue.toLowerCase())
                })
            }
        }
        if (dateTo.length>0 && dateFrom.length>0){
            const from = new Date(dateFrom)
            const to = new Date(dateTo)
            if (to>=from){
                newRequests = newRequests.filter(e=>{
                    return (e.timestamp.getFullYear()>=from.getFullYear() && e.timestamp.getFullYear()<=to.getFullYear() &&
                        e.timestamp.getMonth()>=from.getMonth() && e.timestamp.getMonth()<=to.getMonth() &&
                        e.timestamp.getDate()>=from.getDate() && e.timestamp.getDate()<=to.getDate())
                })
            } else {
                alert('Некорректный диапазон дат.')
            }
        }
        setCurrentRequests(newRequests)
    }

    const clearFilterValues = ()=>{
        setCurrentRequests(requests)
        setSearchValues(['','','',''])
        setDateFrom('')
        setDateTo('')
    }


    return (
        <div >
            <PlotDialog
                visible={isPlotVisible}
                setVisible={setIsPlotVisible}
                requests={currentRequests}
            />
            {/*<div style={{display:"flex",flexDirection:"row"}}>*/}
            {/*    <div className="params">*/}
            {/*        <span>Параметр:</span>*/}
            {/*        <select id="select_stat" style={{marginLeft: 10, fontSize: 18}} value={currentFilter} onChange={(event)=>{*/}
            {/*            setCurrentFilter(event.target.value)*/}
            {/*            if (event.target.value===""){*/}
            {/*                setCurrentRequests(requests)*/}
            {/*            }*/}
            {/*        }}>*/}
            {/*            {filterParams.map(e=>*/}
            {/*                <option key={e.value} value={e.value}>*/}
            {/*                    {e.name}*/}
            {/*                </option>*/}
            {/*            )}*/}
            {/*        </select>*/}
            {/*    </div>*/}
            {/*    {currentFilter === "" ?*/}
            {/*        null :*/}
            {/*        <div className="params" style={{marginLeft:0, padding: 0}}>*/}
            {/*            <input className="myInput"*/}
            {/*                   style={{width:200,fontSize:18,paddingTop:0}}*/}
            {/*                   value={searchValue}*/}
            {/*                   onChange={(e)=>{setSearchValue(e.target.value)}}/>*/}
            {/*            <SearchIcon style={{verticalAlign:"middle", cursor:"pointer"}} onClick={filterRequests}/>*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*</div>*/}
            <div style={{overflow: "auto",maxHeight:300}}>
                {currentRequests.length>0 ? <table className="MyTable" style={{minWidth:700}}>
                    <thead>
                    <tr>
                        <th>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <span  style={{marginLeft: 5, fontSize:18}}>
                                   Дата
                                </span>
                                <div style={{marginLeft: 10, padding: 0}}>
                                {/*    onClick={()=>{
                                        filterRequests(filterParams[0],searchValues[0])
                                    }}*/}
                                    <span style={{fontSize:16,paddingTop:0, color: "#2860ad"}}>
                                        От:
                                    </span>
                                    <input
                                        type='date'
                                        data-date-format="DD MM YYYY"
                                        value={dateFrom}
                                        onChange={(e)=>{setDateFrom(e.target.value)}}
                                        style={{fontSize:17,paddingTop:0, marginLeft: 3, background: "#C0DAF5", color: "#2860ad",
                                            fontFamily: "Comfortaa"}}
                                    />
                                    <span style={{fontSize:16,paddingTop:0, marginLeft: 5, color: "#2860ad"}}>
                                        До:
                                    </span>
                                    <input
                                        type='date'
                                        data-date-format="DD MM YYYY"
                                        value={dateTo}
                                        onChange={(e)=>{setDateTo(e.target.value)}}
                                        style={{fontSize:17,paddingTop:0,  marginLeft: 3, background: "#C0DAF5", color: "#2860ad",
                                            fontFamily: "Comfortaa"}}
                                    />
                                </div>
                            </div>

                        </th>
                        <th>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <span  style={{marginLeft: 5, fontSize:18}}>
                                   Группа
                                </span>
                                <div style={{marginLeft: 10, padding: 0}}>
                                    <input className="myInput"
                                           style={{width:100,fontSize:17,paddingTop:0, background: "#C0DAF5"}}
                                           value={searchValues[0]}
                                           onChange={(e)=>{setSearchValue(1,e.target.value)}}/>
                                    <SearchIcon style={{verticalAlign:"middle"}}/>
                                </div>
                            </div>

                        </th>
                        <th>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <span  style={{marginLeft: 5, fontSize:18}}>
                                   ФИО
                                </span>
                                <div style={{marginLeft: 10, padding: 0}}>
                                    <input className="myInput"
                                           style={{width:100,fontSize:17,paddingTop:0, background: "#C0DAF5"}}
                                           value={searchValues[1]}
                                           onChange={(e)=>{setSearchValue(2,e.target.value)}}/>
                                    <SearchIcon style={{verticalAlign:"middle"}}/>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <span  style={{marginLeft: 5, fontSize:18}}>
                                   Таблица
                                </span>
                                <div style={{marginLeft: 10, padding:   0}}>
                                    <input className="myInput"
                                           style={{width:100,fontSize:17,paddingTop:0, background: "#C0DAF5"}}
                                           value={searchValues[2]}
                                           onChange={(e)=>{setSearchValue(3,e.target.value)}}/>
                                    <SearchIcon style={{verticalAlign:"middle"}}/>
                                </div>
                            </div>

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
                <div>
                    <button
                        className='defaultButton'
                        style={{marginLeft: 60, fontSize: 15, marginTop: 25,
                            paddingLeft: 10, paddingRight: 10, background: "#62A3E7",
                            border: '2px solid rgba(40, 96, 173, 1)'}}
                        onClick={()=>filterRequests()}
                    >
                        Применить фильтры
                    </button>
                    <button
                        className='defaultButton'
                        style={{marginLeft: 60, fontSize: 15, marginTop: 25,
                            paddingLeft: 10, paddingRight: 10, background: "#62A3E7",
                            border: '2px solid rgba(40, 96, 173, 1)'}}
                        onClick={()=> {
                            clearFilterValues()
                        }}
                    >
                        Сбросить фильтрацию
                    </button>
                </div>
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