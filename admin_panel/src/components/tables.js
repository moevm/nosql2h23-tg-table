import React, {useEffect, useState} from 'react';
import "../style/tables.css"
import CloseIcon from '@mui/icons-material/Close';
import BaseDialog from "./base_dialog";
import GroupList from "./group_list/group_list";
import TableSettingsDialog from "./dialogs/table_settings_dialog";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Tables = (props) => {

    useEffect(()=>{
        props.setTitle("Таблицы")
    })

    useEffect(()=>{
        fetch("http://localhost:8000/spreadsheets/",{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                setTablesList(data)
            })
    },[])

    const MenuPage = () => {
        window.location.href='/menu';
    }

    const TablePage = (id) => {
        window.location.href=`/table/${id}`;
    }

    const deleteTable = ()=>{
        const table = tablesList.find(e=>e._id===selectedId)
        fetch("http://localhost:8000/spreadsheets",{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(table)
        })
            .then(res=>res.json())
            .then((data)=>{
                if (data.status===200){
                    let newTables= [...tablesList].filter(e=>e._id!==selectedId)
                    setTablesList(newTables)
                    setIsDeleteDialogVisible(false)
                } else {
                    alert("Удаление не удалось")
                }
            })
    }

    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
    const [selectedId,setSelectedId] = useState(-1)
    const [isAddDialogVisible, setIsAddDialogVisible] = useState(false)
    const [tablesList, setTablesList] = useState([])
    const [groupList, setGroupsList] = useState([])
    const [subject, setSubject] = useState("")
    const [link, setLink] = useState("")
    const [sheetQuantity, setSheetQuantity] = useState(1)
    const [isSettingsDialogVisible, setIsSettingsDialogVisible] = useState(false)
    const [addTableSettings,setAddTableSettings] = useState([])
    const convertColumnToNumber = (column)=>{
        let columnNumber = 0
        for (let i = column.length-1;i>=0;i--){
            const char = column[i]
            columnNumber+= (char.charCodeAt(0) - 'A'.charCodeAt(0) + 1)*(26*(column.length-1-i)>0 ? 26*(column.length-1-i) : 1)
        }
        return columnNumber
    }
    const addTable = ()=>{
        if (subject.length===0 || link.length===0 || groupList.length===0 || sheetQuantity===0 || addTableSettings===null){
            alert("Пожалуйста, заполните все поля!")
            return
        }
        const sheets = addTableSettings.map(e=>{
            return {
                startRow: e.lastHeadRow+1,
                endRow: e.lastRow,
                headerRow: e.columnNamesRow,
                startColumn: 1,
                endColumn: convertColumnToNumber(e.lastColumn.toUpperCase()),
                columns: []
            }
        })
        const table = {
            link: link,
            name: `[${subject}] ${groupList.map(e=>{return e.groupNumber}).join(", ")}`,
            sheets : sheets
        }
        props.setLoading(true)
        fetch("http://localhost:8000/spreadsheets/",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(table)
        })
            .then(res=>res.json())
            .then(data=>{
                if (data.status===201){
                    const _table = {
                        _id: data._id,
                        name: table.name,
                    }
                    const newTablesList = [...tablesList]
                    newTablesList.push(_table)
                    setTablesList(newTablesList)
                    setSubject('')
                    setLink('')
                    setSheetQuantity(1)
                    setAddTableSettings([])
                    setGroupsList([])
                    setIsAddDialogVisible(false)
                    props.setLoading(false)
                } else {
                    alert("Произошла ошибка")
                }
            })
    }
    return (
        <div>
            <BaseDialog visible={isDeleteDialogVisible} setVisible={setIsDeleteDialogVisible}>
                <div style={{display:"flex", flexDirection:"column",fontSize: 24}}>
                    <span>{`Вы действительно хотите удалить данную`}</span>
                    <span>таблицу?</span>
                    <div style={{display:"flex", flexDirection:"row",marginTop:20}}>
                        <button
                            className='defaultButton'
                            style={{background: '#E71717',marginRight:"auto"}}
                            onClick={deleteTable}
                        >
                            Удалить
                        </button>
                        <button
                            className='defaultButton'
                            style={{marginLeft:"auto"}}
                            onClick={()=>{setIsDeleteDialogVisible(false)}}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </BaseDialog>
            <BaseDialog visible={isAddDialogVisible} setVisible={setIsAddDialogVisible}>
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
                            <td style={{textAlign:"end"}}>
                                <span>Код предмета: </span>
                            </td>
                            <td style={{textAlign:"end"}} colSpan="2">
                                <input
                                    type='text'
                                    required
                                    className="myInput"
                                    value={subject}
                                    onChange={(e)=>{setSubject(e.target.value)}}
                                />
                            </td>
                        </tr>
                        <tr >
                            <td style={{textAlign:"end"}}>
                                <span>Группы: </span>
                            </td>
                            <td colSpan="2">
                                <GroupList groups={groupList} updateGroupList={setGroupsList}/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"end"}}>
                                <span>Ссылка: </span>
                            </td>
                            <td colSpan="2">
                                <input
                                    type='text'
                                    required
                                    className="myInput"
                                    value={link}
                                    onChange={(e)=>{setLink(e.target.value)}}
                                />
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
                            onClick={addTable}
                        >
                            Добавить
                        </button>
                        <button
                            className='defaultButton'
                            style={{marginLeft:"auto"}}
                            onClick={()=>{
                                setIsAddDialogVisible(false)
                                setSubject('')
                                setLink('')
                                setGroupsList([])
                            }}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </BaseDialog>
            <div>
                <InfoOutlinedIcon onClick={()=>{alert("1. Система поддерживает таблицы только в формате \"Google Docs\";\n" +
                    "2. Убедитесь, что в таблице присутствует колонка \"telegramId\";\n" +
                    "3. Колонка \"telegramId\" содержит username'ы студентов в мессенджере Telegram;\n" +
                    "4. Названия колонок должны находиться в одной строке;\n" +
                    "5. При добавлении листов таблиц они отображаются в системе по порядку;\n" +
                    "6. Для добавления таблицы требуется указать всю требуемую информацию обо всех листах, которые нужно добавить в систему;\n" +
                    "7. Система поддерживает взаимодействие с приватными таблицами. Для этого необходимо в \"Настройках доступа\" таблицы добавить в группу \"Редакторы\" сервисный аккаунт \"email@gmail.com\"\n" +
                    "8. При замене ссылки на странице текущей таблицы -- названия колонок обновятся в соответствии со структурой таблицы, на которую ведёт новая ссылка\n" +
                    "9. При нажатии на символ \"планеты\" возле ссылки -- выполнится переход по соответствующей ссылке;\n" +
                    "10. \"Просмотр таблицы\" позволит увидеть таблицу внутри системы;\n" +
                    "11. Чтобы сохранить изменения, внесенный в настройки таблицы, нажмите кнопку \"Применить\";")}} style={{color:"#016EB2", cursor:"pointer"}}></InfoOutlinedIcon>
            </div>
            <div>
                {tablesList.map(table =>
                    <div className='tablesListItem' key = {table._id} onClick={()=>
                        TablePage(table._id)}>
                        {table.name}
                        <CloseIcon sx={{float: "right", color: "#EE0100"}} onClick={(e)=>{
                            e.stopPropagation()
                            setSelectedId(table._id)
                            setIsDeleteDialogVisible(true)}}/>
                    </div>
                )}
                <button
                    className='defaultButton'
                    style={{background: '#016EB2',fontSize:20}}
                    onClick={()=>{setIsAddDialogVisible(true)}}
                >
                    Добавить таблицу
                </button>
            </div>
            <button
                className='defaultButton'
                style={{marginTop: 60, marginRight: 305, fontSize: 18}}
                onClick={MenuPage}
            >
                Назад
            </button>
        </div>
    );
};

export default Tables;