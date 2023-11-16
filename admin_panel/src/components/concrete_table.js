import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PublicIcon from '@mui/icons-material/Public';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import "../style/concrete_table.css"
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const ConcreteTable = (props) => {

    const TablePage = () => {
        window.location.href='/tables';
    }

    const saveTable = () => {
        console.log("tut save kek")
    }

    let {id} = useParams()
    const [spreadsheet,setSpreadSheet] = useState({
        "_id": {
            "$oid": "6535285262d4a2a9cab87fff"
        },
        "link": "google.doc",
        "name": "[NoSQL] 0382",
        "sheets": [
            {
                "_id": {
                    "$oid": "aaa527df62d4a2a9cab8713a"
                },
                "startRow": 2,
                "endRow": 4,
                "startColumn": 1,
                "endColumn": 7,
                "columns": [
                    {
                        "_id": "fff527df62d4a2a9cab8713a",
                        "name": "ФИО",
                        "index": 33,
                        "isTelegramId": false,
                        "isAccesible": true
                    },
                    {
                        "_id": "3434348713a",
                        "name": "Telegram_Id",
                        "index": 23,
                        "isTelegramId": true,
                        "isAccesible": false
                    },
                    {
                        "_id": "34343487135a",
                        "name": "Telegram_Id",
                        "index": 23,
                        "isTelegramId": true,
                        "isAccesible": false
                    },
                    {
                        "_id": "34343483713a",
                        "name": "Telegram_Id",
                        "index": 23,
                        "isTelegramId": true,
                        "isAccesible": false
                    },
                    {
                        "_id": "34314348713a",
                        "name": "Telegram_Id",
                        "index": 23,
                        "isTelegramId": true,
                        "isAccesible": false
                    },
                    {
                        "_id": "3423234348713a",
                        "name": "Telegram_Id",
                        "index": 23,
                        "isTelegramId": true,
                        "isAccesible": false
                    },
                ]
            }
        ]
    })
    const onChangeItem = (value)=>{
        setCurrentSheetId(value)
        // console.log(spreadsheet.sheets[value])
    }

    const onChangeAccesible = (columnIndex, value)=>{
        const copy = JSON.parse(JSON.stringify(spreadsheet))
        copy.sheets[currentSheetId].columns[columnIndex].isAccesible = value;
        setSpreadSheet(copy)
    }
    const [currentSheetId,setCurrentSheetId] = useState(0)
    useEffect(()=>{
        //fetch - >
        props.setTitle('[Урмф] 0382, 0383')
    })
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>
                        <div className="TableInfo">
                            <span>Ссылка на таблицу:</span>
                            <PublicIcon sx={{marginLeft: 2}}/>
                        </div>
                    </td>
                    <td>
                        <div className="TableInfo" style={{background: "#62A3E7", width: "fit-content", minWidth: 0}}>
                            <span>Лист:</span>
                            <select style={{marginLeft: 12}} onChange={(e)=>{onChangeItem(e.target.value)}}>
                                {[ ...Array(spreadsheet.sheets.length).keys() ].map(i => <option key={i} value = {i}>{i+1}</option>)}
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <div className="TableInfo" style={{marginLeft: 80, width: "fit-content", minWidth: 0}}>
                            <span>Число строк в заголовке: </span>
                            <span style={{fontFamily: "Lobster Two",marginLeft:15, marginRight: 15}}>{spreadsheet.sheets[currentSheetId]["startRow"]}</span>
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
                                        <CheckBoxIcon onClick={()=>{onChangeAccesible(index,!column.isAccesible)}} style={{color: "#00B601"}}/> :
                                        <CloseIcon onClick={()=>{onChangeAccesible(index,!column.isAccesible)}} style={{color: "#EB0001"}}/> }
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
    );
};

export default ConcreteTable;