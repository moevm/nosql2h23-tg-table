import React, {useEffect, useState} from 'react';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SearchIcon from '@mui/icons-material/Search';
import PlotDialog from "./dialogs/plot_dialog";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Statistics = (props) => {
    useEffect(()=>{
        props.setTitle("Статистика")
    })

    useEffect(()=>{
        let urlParams = new URLSearchParams({})
        urlParams.append('page',currentPage)
        fetch(`http://localhost:8000/requests/?`+urlParams,{
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
            })
    },[])

    const MenuPage = () => {
        window.location.href='/menu';
    }

    const filterParams = ["groupNumber","name","spreadsheet"]

    const [requests,setRequests] = useState([])
    const [isPlotVisible, setIsPlotVisible] = useState(false)
    const [searchValues,setSearchValues] = useState([
        '','',''
    ])
    const [dateFrom,setDateFrom] = useState('')
    const [dateTo,setDateTo] = useState('')

    const [currentPage,setCurrentPage] = useState(0)

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

    const clearFilterValues = ()=>{
        let urlParams = new URLSearchParams({})
        setCurrentPage(0)
        urlParams.append('page',0)
        fetch(`http://localhost:8000/requests/?`+urlParams,{
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
                setSearchValues(['','','',''])
                setDateFrom('')
                setDateTo('')
            })
    }

    const filterRequests = ()=>{
        let urlParams = new URLSearchParams({})
        for (let i=0;i<3;i++){
            if (searchValues[i].length>0){
                urlParams.append(filterParams[i],searchValues[i])
            }
        }
        if (dateFrom.length>0 && dateTo.length>0){
            let from = new Date(dateFrom)
            urlParams.append('dateFrom',from.toISOString())
            let to = new Date(dateTo)
            urlParams.append('dateTo',to.toISOString())
        }
        urlParams.append('page',currentPage)
        fetch(`http://localhost:8000/requests/?`+urlParams,{
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
                setCurrentPage(0)
            })
    }

    const updatePage = (delta)=>{
        let urlParams = new URLSearchParams({})
        for (let i=0;i<3;i++){
            if (searchValues[i].length>0){
                urlParams.append(filterParams[i],searchValues[i])
            }
        }
        if (dateFrom.length>0 && dateTo.length>0){
            let from = new Date(dateFrom)
            urlParams.append('dateFrom',from.toISOString())
            let to = new Date(dateTo)
            urlParams.append('dateTo',to.toISOString())
        }
        urlParams.append('page',currentPage+delta)
        fetch(`http://localhost:8000/requests/?`+urlParams,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                if (data.length>0){
                    const requestsWithCorrectTime = data.map(e=>{
                        return {...e,timestamp:new Date(e.timestamp)}
                    })
                    setCurrentPage(currentPage+delta)
                    setRequests(requestsWithCorrectTime)
                }
            })
    }

    return (
        <div >
            <PlotDialog
                visible={isPlotVisible}
                setVisible={setIsPlotVisible}
                requests={requests}
            />
            <div style={{textAlign:'end',marginRight:20}}>
                {currentPage>0 ? <KeyboardArrowLeftIcon
                    style={{background: "#62A3E7",
                        border: '2px solid rgba(40, 96, 173, 1)',
                        borderRadius: 5,
                        color: "white",
                        verticalAlign:"middle",
                        cursor:'pointer'}}
                    onClick={()=>{updatePage(-1)}}
                ></KeyboardArrowLeftIcon> : null}
                <span style={{color: "#1A4297", fontSize: 20, paddingLeft: 5, paddingRight: 5, fontWeight:'bold'}}>{currentPage+1}</span>
                <KeyboardArrowRightIcon
                    style={{background: "#62A3E7",
                        border: '2px solid rgba(40, 96, 173, 1)',
                        borderRadius: 5,
                        color: "white",
                        verticalAlign:"middle", cursor:'pointer'}}
                    onClick={()=>{updatePage(1)}}
                >

                </KeyboardArrowRightIcon>
            </div>
            <div style={{overflow: "auto",maxHeight:300,marginTop:10}}>
                {requests.length>0 ? <table className="MyTable" style={{minWidth:700}}>
                    <thead>
                    <tr>
                        <th>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <span  style={{marginLeft: 5, fontSize:18}}>
                                   Дата
                                </span>
                                <div style={{marginLeft: 10, padding: 0}}>
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
                                           onChange={(e)=>{setSearchValue(0,e.target.value)}}/>
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
                                           onChange={(e)=>{setSearchValue(1,e.target.value)}}/>
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
                                           onChange={(e)=>{setSearchValue(2,e.target.value)}}/>
                                    <SearchIcon style={{verticalAlign:"middle"}}/>
                                </div>
                            </div>

                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    {requests.map(request=>
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
                        onClick={()=>{filterRequests()}}
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