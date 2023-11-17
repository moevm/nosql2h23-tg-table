import React, {useEffect, useState} from 'react';
import "../style/tables.css"
import CloseIcon from '@mui/icons-material/Close';
import BaseDialog from "./base_dialog";
import GroupList from "./group_list/group_list";

const Tables = (props) => {
    const MenuPage = () => {
        window.location.href='/menu';
    }

    const TablePage = (id) => {
        window.location.href=`/table/${id}`;
    }

    const deleteTable = ()=>{
        setTablesList([...tablesList].filter(e=>{return e.id!==selectedId}))
        setIsDeleteDialogVisible(false)
    }

    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
    const [selectedId,setSelectedId] = useState(-1)
    const [isAddDialogVisible, setIsAddDialogVisible] = useState(false)
    const [tablesList, setTablesList] = useState([
        {id: 1, name: '[Урмф] 0382, 0383'},
        {id: 2, name: '[PR] 1243, 9999, 1010'},
        {id: 3, name: '[БЖД] 0382'},])
    const [groupList, setGroupsList] = useState([
        {
            groupNumber: "4382",
        },
        {
            groupNumber: "4383"
        }
    ])
    const [subject, setSubject] = useState("")
    const [link, setLink] = useState("")
    const addTable = ()=>{
        if (subject.length===0 || link.length===0 || groupList.length===0){
            alert("Все поля должны быть не пусты")
            return
        }
        const table = {
            id: tablesList[tablesList.length-1].id+1,
            name: `[${subject}] ${groupList.map(e=>{return e.groupNumber}).join(", ")}`,
            link: link
        }
        const newTablesList = [...tablesList]
        newTablesList.push(table)
        setTablesList(newTablesList)
        setSubject('')
        setLink('')
        setGroupsList([])
        setIsAddDialogVisible(false)
    }
    useEffect(()=>{
        props.setTitle("Таблицы")
    })
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
                <div style={{display:"flex", flexDirection:"column",fontSize: 24}}>
                    <table style={{borderSpacing: 25}}>
                        <tbody>
                        <tr>
                            <td>
                                <span>Код предмета: </span>
                            </td>
                            <td style={{textAlign:"end"}}>
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
                            <td>
                                <GroupList groups={groupList} updateGroupList={setGroupsList}/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"end"}}>
                                <span>Ссылка: </span>
                            </td>
                            <td>
                                <input
                                    type='text'
                                    required
                                    className="myInput"
                                    value={link}
                                    onChange={(e)=>{setLink(e.target.value)}}
                                />
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
                {tablesList.map(table =>
                    <div className='tablesListItem' key = {table.id} onClick={()=>
                        TablePage(table.id)}>
                        {table.name}
                        <CloseIcon sx={{float: "right", color: "#EE0100"}} onClick={(e)=>{
                            e.stopPropagation()
                            setSelectedId(table.id)
                            setIsDeleteDialogVisible(true)}}/>
                    </div>
                )}
                <button
                    className='defaultButton'
                    style={{background: '#016EB2'}}
                    onClick={()=>{setIsAddDialogVisible(true)}}
                >
                    Добавить таблицу
                </button>
            </div>
            <button
                className='defaultButton'
                style={{marginTop: 60, marginRight: 305, fontSize: 25}}
                onClick={MenuPage}
            >
                Назад
            </button>
        </div>
    );
};

export default Tables;