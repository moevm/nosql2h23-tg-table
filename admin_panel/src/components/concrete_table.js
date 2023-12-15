import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PublicIcon from '@mui/icons-material/Public';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import "../style/concrete_table.css"
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableSettingsDialog from "./dialogs/table_settings_dialog";

const ConcreteTable = (props) => {
    let {id} = useParams()

    useEffect(()=>{
        fetch(`http://localhost:8000/spreadsheets/${id}`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                setSpreadSheet(data)
                setLinkValue(data.link)
                setHeaderRow(data.sheets[0].headerRow)
                props.setTitle(data.name)
            })
    },[])

    const TablePage = () => {
        window.location.href='/tables';
    }

    const convertColumnToNumber = (column)=>{
        let columnNumber = 0
        for (let i = column.length-1;i>=0;i--){
            const char = column[i]
            columnNumber+= (char.charCodeAt(0) - 'A'.charCodeAt(0) + 1)*(26*(column.length-1-i)>0 ? 26*(column.length-1-i) : 1)
        }
        return columnNumber
    }

    const saveTable = () => {
        console.log(spreadsheet)
        if (check()){
            fetch(`http://localhost:8000/spreadsheets/${id}`,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(spreadsheet)
            })
                .then(res=>res.json())
                .then((data)=>{
                    if (data.status===200){

                    } else {
                        alert("Не удалось отредактировать данные")
                    }
                })
        } else {
            alert('Введены некорректные данные')
        }
    }

    const [spreadsheet,setSpreadSheet] = useState(null)
    const [linkValue,setLinkValue] = useState('')
    const [headerRow, setHeaderRow] = useState(0)
    const [isSettingsDialogVisible, setIsSettingsDialogVisible] = useState(false)
    const onChangeItem = (value)=>{
        setCurrentSheetId(value)
        setHeaderRow(spreadsheet.sheets[value].headerRow)
    }

    const onChangeAccesible = (columnIndex, value)=>{
        const copy = JSON.parse(JSON.stringify(spreadsheet))
        copy.sheets[currentSheetId].columns[columnIndex].isAccesible = value;
        setSpreadSheet(copy)
    }

    const check = ()=>{
        if (linkValue.length>0){
            if (linkValue.includes('https://docs.google.com/')){
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const followLink = ()=>{
        if (linkValue.includes('http://') || linkValue.includes('https://')){
            window.open(linkValue,"_blank")
        } else {
            alert('Невозможно перейти по ссылке')
        }
    }

    const saveHeaderRow = ()=>{
        if (headerRow<=spreadsheet.sheets[currentSheetId].headerRow){
            const copy = JSON.parse(JSON.stringify(spreadsheet))
            copy.sheets[currentSheetId].headerRow = headerRow
            setSpreadSheet(copy)
        } else {
            alert('Некорректный номер строки')
        }
    }

    const addSheet = (settings) => {
        const sheets = settings.map(e=>{
            return {
                startRow: e.lastHeadRow+1,
                endRow: e.lastRow,
                headerRow: e.columnNamesRow,
                startColumn: 1,
                endColumn: convertColumnToNumber(e.lastColumn.toUpperCase()),
                columns: []
            }
        })
        const copy = JSON.parse(JSON.stringify(spreadsheet))
        copy.sheets.push(sheets[0])
        setSpreadSheet(copy)
    }

    const [currentSheetId,setCurrentSheetId] = useState(0)
    return (
        <div>
            <TableSettingsDialog
                visible={isSettingsDialogVisible}
                setVisible={setIsSettingsDialogVisible}
                setTableSettings={addSheet}
                sheetQuantity='1'
            ></TableSettingsDialog>
            {spreadsheet ===null ?
                null :
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <div className="TableInfo" style={{display:'flex', flexDirection:'row',alignItems:'center'}}>
                                    <input
                                        className='myInput'
                                        value={linkValue}
                                        onChange={(e)=>{
                                            setLinkValue(e.target.value)
                                            const copy = JSON.parse(JSON.stringify(spreadsheet))
                                            copy.link = e.target.value
                                            setSpreadSheet(copy)
                                        }}
                                    />
                                    <PublicIcon
                                        sx={{marginLeft: 1}}
                                        style={{cursor:'pointer'}}
                                        onClick={()=>{followLink()}}>
                                    </PublicIcon>
                                </div>
                            </td>
                            <td style={{display:'flex',flexDirection:'row', alignItems:'center', marginTop:5}}>
                                <div className="TableInfo" style={{background: "#62A3E7", width: "fit-content", minWidth: 0,marginRight:0}}>
                                    <span>Лист:</span>
                                    <select style={{marginLeft: 12}} onChange={(e)=>{onChangeItem(e.target.value)}}>
                                        {[ ...Array(spreadsheet.sheets.length).keys() ].map(i => <option key={i} value = {i}>{i+1}</option>)}
                                    </select>
                                </div>
                                <AddBoxIcon
                                    style={{marginBottom:8,marginLeft:5,cursor:'pointer'}}
                                    sx={{fontSize:30, color:'#1A4297'}}
                                    onClick={()=>{setIsSettingsDialogVisible(true)}}
                                ></AddBoxIcon>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <div className="TableInfo" style={{marginLeft: 80, width: "fit-content", minWidth: 0,display:'flex', flexDirection:'row',alignItems:'center'}}>
                                    <span>Номер строки с заголовком: </span>
                                    {/*<span style={{fontFamily: "Lobster Two",marginLeft:15, marginRight: 15}}>{spreadsheet.sheets[currentSheetId]["startRow"]-1}</span>*/}
                                    <input
                                        style={{fontFamily: "Lobster Two", fontSize: 18, marginLeft:15, marginRight: 5, maxWidth:40}}
                                        type='number'
                                        min='0'
                                        value={headerRow}
                                        onChange={(e)=>{setHeaderRow(Number(e.target.value))}}
                                    />
                                    <CheckCircleOutlineIcon style={{cursor:'pointer'}} onClick={()=>{saveHeaderRow()}}>
                                    </CheckCircleOutlineIcon>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="TableInfo" style={{background: "white", color: "#153A8A"}}>
                                    <span>Колонка: </span>
                                </div>
                            </td>
                            <td>
                                <div className="TableInfo" style={{background: "white", color: "#153A8A"}}>
                                    <span>Доступ для студентов:</span>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div style={{overflow: "auto",maxHeight:300}}>
                        <table>
                            <tbody>
                            {[ ...Array(spreadsheet.sheets[currentSheetId].columns.length).keys()].map(index=> {
                                const column = spreadsheet.sheets[currentSheetId].columns[index]
                                return <tr key={column._id}>
                                    <td>
                                        {column.isTelegramId ?
                                            <div className="TableInfo" style={{background: "white", color: "#153A8A"}}>
                                                <ContactPageIcon/>
                                                <span>{column.name} </span>
                                            </div> :
                                            <div className="TableInfo" style={{background: "white", color: "#153A8A"}}>
                                                <span>{column.name} </span>
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        <div className="TableInfo" style={{
                                            background: "white",
                                            width: "fit-content",
                                            minWidth: 0,
                                            padding: 3,
                                            marginLeft: 60
                                        }}>
                                            {column.isAccesible ?
                                                <CheckBoxIcon onClick={()=>{onChangeAccesible(index,!column.isAccesible)}} style={{color: "#00B601",cursor:'pointer'}}/> :
                                                <CloseIcon onClick={()=>{onChangeAccesible(index,!column.isAccesible)}} style={{color: "#EB0001",cursor:'pointer'}}/> }
                                        </div>
                                    </td>
                                </tr>
                            })}
                            <tr>
                                <td>

                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",marginLeft:40,marginTop: 60}}>
                        <button
                            className='defaultButton'
                            style={{marginRight: 35, fontSize: 25}}
                            onClick={TablePage}
                        >
                            Назад
                        </button>
                        <button
                            className='defaultButton'
                            style={{marginRight: 35, fontSize: 25, background: "#62A3E7"}}
                            onClick={saveTable}
                        >
                            Применить
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default ConcreteTable;