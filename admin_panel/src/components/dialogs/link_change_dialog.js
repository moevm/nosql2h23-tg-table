import React, {useState} from 'react';
import TableSettingsDialog from "./table_settings_dialog";
import BaseDialog from "../base_dialog";

const LinkChangeDialog = (props) => {

    const [sheetQuantity,setSheetQuantity] = useState(1)
    const [isSettingsDialogVisible,setIsSettingsDialogVisible] = useState(false)
    const [addTableSettings,setAddTableSettings] = useState([])

    return (
        <BaseDialog visible={props.visible} setVisible={props.setVisible}>
            <TableSettingsDialog
                visible={isSettingsDialogVisible}
                setVisible={setIsSettingsDialogVisible}
                setTableSettings={setAddTableSettings}
                sheetQuantity={sheetQuantity}
            />
            <div style={{display:"flex", flexDirection:"column",fontSize: 24}}>
                <table style={{borderSpacing: 25}}>
                    <tbody>
                    <tr>
                        <td colSpan="3">
                            <span style={{color:"#2860ADFF"}}>Вы изменили ссылку, введите новые параметры для листов таблицы.</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <span style={{color:"red"}}>Предупреждение: предыдущие настройки таблицы будет безвозвратно утеряны.</span>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"end"}}>
                            <span>Количество листов в таблице: </span>
                        </td>
                        <td colSpan="2">
                            <input
                                type='number'
                                required
                                className="myInput"
                                value={sheetQuantity}
                                onChange={(e)=>{
                                    setAddTableSettings([])
                                    setSheetQuantity(Number(e.target.value))
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"end"}}>
                            <span>Настройки таблицы:</span>
                        </td>
                        <td style={{textAlign:"start"}}>
                            {addTableSettings.length===0 ?
                                <span style={{color:"red"}}>не установлены</span> :
                                <span style={{color:"green"}}>установлены</span>
                            }
                        </td>
                        <td>
                            {addTableSettings.length===0 ?
                                <button
                                    className="defaultButton"
                                    onClick={()=>{setIsSettingsDialogVisible(true)}}
                                >Установить</button> :
                                <button
                                    className="defaultButton"
                                    onClick={()=>{setIsSettingsDialogVisible(true)}}
                                >Редактировать</button>
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div style={{display:"flex", flexDirection:"row",marginTop:20}}>
                    <button
                        className='defaultButton'
                        style={{marginRight:"auto"}}
                        onClick={()=>{
                            props.setSettings(addTableSettings)
                            setSheetQuantity(1)
                            setAddTableSettings([])
                            props.setVisible(false)
                        }}
                    >
                        Добавить
                    </button>
                    <button
                        className='defaultButton'
                        style={{marginLeft:"auto"}}
                        onClick={()=>{
                            setSheetQuantity(1)
                            setAddTableSettings([])
                            props.setVisible(false)
                        }}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </BaseDialog>
    );
};

export default LinkChangeDialog;