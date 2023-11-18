import React, {useEffect, useState} from 'react';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SearchIcon from '@mui/icons-material/Search';
import PlotDialog from "./dialogs/plot_dialog";
import ExportDialog from "./dialogs/export_dialog";
import ImportDialog from "./dialogs/import_dialog";

const Statistics = (props) => {
    useEffect(()=>{
        props.setTitle("Статистика")
    })

    const MenuPage = () => {
        window.location.href='/menu';
    }

    const properties = ["id","time","groupNumber","name","table"]

    let __requests = [
        {
            id: 1,
            time: new Date('December 18, 2021 03:24:00'),
            groupNumber: "4333",
            name: "Чегодаев Кондратий Сергеев",
            table: "[noSQL]"
        },
        {
            id: 2,
            time: new Date('December 17, 2021 03:24:00'),
            groupNumber: "6654",
            name: "Сергеев Чегодай Кондратьевич",
            table: "[lol]"
        },
        {
            id: 3,
            time: new Date('December 17, 2021 03:24:00'),
            groupNumber: "5555",
            name: "Сергеев Кондратий Чегодаевич",
            table: "[noSQL]"
        },
        {
            id: 4,
            time: new Date('December 5, 2021 03:25:00'),
            groupNumber: "3333",
            name: "Чегодаев Кондратий Сергеев",
            table: "[kek]"
        },
        {
            id: 5,
            time: new Date('December 9, 2023 03:25:00'),
            groupNumber: "5555",
            name: "Etlon",
            table: "[applyLatte]"
        },
    ]

    const filterParams = [{
        name: "Все",
        value: ""
    }, {
        name: "Время",
        value: "time"
    }, {
        name: "Группа",
        value: "groupNumber"
    }, {
        name: "ФИО",
        value: "name"
    }, {
        name: "Таблица",
        value: "table"
    }]

    const [requests,setRequests] = useState(__requests)
    const [currentRequests, setCurrentRequests] = useState(requests)
    const [currentFilter, setCurrentFilter] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [isPlotVisible, setIsPlotVisible] = useState(false)
    const [isExportDialogVisible, setIsExportDialogVisible] = useState(false)
    const [isImportDialogVisible, setIsImportDialogVisible] = useState(false)

    const resetFilter = ()=>{
        // const select = document.getElementById("select_stat")
        // select.value = ""
        setCurrentFilter("")
        setSearchValue("")
    }

    const filterRequests = ()=>{
        let newRequests;
        if (searchValue.length>0){
            newRequests = [...requests].filter(e=>e[currentFilter].toString()   .includes(searchValue))
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
            <ExportDialog
                visible={isExportDialogVisible}
                setVisible={setIsExportDialogVisible}
                data={currentRequests}
            />
            <ImportDialog
                visible={isImportDialogVisible}
                setVisible={setIsImportDialogVisible}
                setCurrent={setCurrentRequests}
                setAll={setRequests}
                properties={properties}
                filter={resetFilter}
            />
            <div style={{display: "flex", flexDirection: "column", minWidth: 400}}>
                <button
                    className='defaultButton'
                    style={{background: '#62A3E7', marginLeft:"auto", fontSize: 18, minWidth: 100}}
                    onClick={()=>{setIsImportDialogVisible(true)}}
                >
                    Импорт
                </button>
                <button
                    className='defaultButton'
                    style={{background: '#62A3E7', marginTop: 15, marginLeft:"auto", fontSize: 18, minWidth: 100}}
                    onClick={()=>{setIsExportDialogVisible(true)}}
                >
                    Экспорт
                </button>
            </div>
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
                        <tr key={request.id}>
                            <td>
                                {`${request.time.toLocaleDateString()} ${request.time.toLocaleTimeString()}`}
                            </td>
                            <td>
                                {request.groupNumber}
                            </td>
                            <td>
                                {request.name}
                            </td>
                            <td>
                                {request.table}
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