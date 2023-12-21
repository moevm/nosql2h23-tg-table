import React, {useEffect, useState} from 'react';
import BaseDialog from "../base_dialog";

const TableSettingsDialog = (props) => {

    const [sheetsSettings,setSheetsSettings] = useState([...Array(props.sheetQuantity).keys()].map(e=>{
        return {
            lastHeadRow : 0,
            columnNamesRow: 0,
            lastColumn: "",
            lastRow: 0
        }
    }))
    useEffect(()=>{
        if (sheetsSettings.length!==props.sheetQuantity){
            setCurrentSheet(0)
            setSheetsSettings([...Array(props.sheetQuantity).keys()].map(e=>{
                return {
                    lastHeadRow : 0,
                    columnNamesRow: 0,
                    lastColumn: "",
                    lastRow: 0
                }
            }))
        }
    },[props])

    const [currentSheet,setCurrentSheet] = useState(0)

    const updateSheetsSettings = (paramName, value) => {
        const updatedSettings = sheetsSettings.map((e,ind)=>{
            if (ind!==currentSheet){
                return e
            } else {
                let tmp = {...e}
                tmp[paramName] = value
                return tmp
            }
        })
        setSheetsSettings(updatedSettings)
    }

    const addSettings = ()=>{
        for (let sheetSetting of sheetsSettings.values()){
            if (sheetSetting.columnNamesRow>sheetSetting.lastHeadRow
                || sheetSetting.lastHeadRow>sheetSetting.lastRow
                || sheetSetting.columnNamesRow<=0
                || sheetSetting.lastRow<=0
                || sheetSetting.lastHeadRow<=0
                || sheetSetting.lastColumn.length<=0
            ){
                alert("Пожалуйста, проверьте корректность введённых данных")
                return
            }
        }

        props.setTableSettings(sheetsSettings)
        props.setVisible(false)
        setSheetsSettings([...Array(props.sheetQuantity).keys()].map(e=>{
            return {
                lastHeadRow : 0,
                columnNamesRow: 0,
                lastColumn: "",
                lastRow: 0
            }
        }))
        // TODO(Регульрка для проверки названия последне колонки)
    }

    return (
        <BaseDialog
            visible={props.visible}
            setVisible={props.setVisible}
        >
            <div>
                <table>
                    <tbody style={{textAlign:"end"}}>
                    {props.sheetQuantity>1 ?
                        <tr>
                            <td>
                                <span style={{marginRight:10}}>Настройки для листа  : </span>
                            </td>
                            <td style={{textAlign:"start"}}>
                                <select
                                    value={currentSheet}
                                    style={{fontSize:18}}
                                    onChange={(e)=>{setCurrentSheet(Number(e.target.value))}}
                                >
                                    {[...Array(props.sheetQuantity).keys()].map((e,ind)=>
                                        <option key={ind} value={ind}>{ind+1}</option>
                                    )}
                                </select>
                            </td>
                        </tr> : null}
                        <tr>
                            <td>
                                <span>Номер последней строки в заголовке</span>
                                <span style={{marginRight:3, color:"red"}}>* </span>
                                <span style={{marginRight:10}}>: </span>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="myInput"
                                    value={sheetsSettings[currentSheet].lastHeadRow}
                                    onChange={(e)=>{
                                        const value = parseInt(e.target.value,10)
                                        if (e.target.value === ''){
                                            updateSheetsSettings("lastHeadRow",0)
                                        } else {
                                            if (!isNaN(value)){
                                                updateSheetsSettings("lastHeadRow",value)
                                            } else {
                                                alert('Вы пытаетесь ввести некорректные данные. Пожалуйста проверьте и повторите попытку.')
                                            }
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>Номер строки, в которой находятся названия колонок</span>
                                <span style={{marginRight:3, color:"red"}}>* </span>
                                <span style={{marginRight:10}}>: </span>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="myInput"
                                    value={sheetsSettings[currentSheet].columnNamesRow}
                                    onChange={(e)=>{
                                        const value = parseInt(e.target.value,10)
                                        if (e.target.value === ''){
                                            updateSheetsSettings("columnNamesRow",0)
                                        } else {
                                            if (!isNaN(value)){
                                                updateSheetsSettings("columnNamesRow",value)
                                            } else {
                                                alert('Вы пытаетесь ввести некорректные данные. Пожалуйста проверьте и повторите попытку.')
                                            }
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>Номер последней колоноки</span>
                                <span style={{marginRight:3, color:"red"}}>* </span>
                                <span style={{marginRight:10}}>: </span>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="myInput"
                                    placeholder="Примеры: A | G | AA"
                                    value={sheetsSettings[currentSheet].lastColumn}
                                    onChange={(e)=>{
                                        updateSheetsSettings("lastColumn",e.target.value)
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>Номер последней строки с данными</span>
                                <span style={{marginRight:3, color:"red"}}>* </span>
                                <span style={{marginRight:10}}>: </span>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="myInput"
                                    value={sheetsSettings[currentSheet].lastRow}
                                    onChange={(e)=>{
                                        const value = parseInt(e.target.value,10)
                                        if (e.target.value === ''){
                                            updateSheetsSettings("lastRow",0)
                                        } else {
                                            if (!isNaN(value)){
                                                updateSheetsSettings("lastRow",value)
                                            } else {
                                                alert('Вы пытаетесь ввести некорректные данные. Пожалуйста проверьте и повторите попытку.')
                                            }
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <span style={{marginRight:120, color:"red"}}>* -- поля, обязательные для заполения</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{display:"flex",flexDirection:"row", marginTop:15}}>
                <button
                    className='defaultButton'
                    style={{marginRight:"auto"}}
                    onClick={addSettings}
                >
                    Добавить
                </button>
                <button
                    className='defaultButton'
                    style={{marginLeft:"auto"}}
                    onClick={()=>{
                        props.setVisible(false)
                        setSheetsSettings([...Array(props.sheetQuantity).keys()].map(e=>{
                            return {
                                lastHeadRow : 0,
                                columnNamesRow: 0,
                                lastColumn: "",
                                lastRow: 0
                            }
                        }))
                    }}
                >
                    Отмена
                </button>
            </div>
        </BaseDialog>
    );
};

export default TableSettingsDialog;