import React, {useEffect, useState} from 'react';
import "../style/menu.css"
import ExportDialog from "./dialogs/export_dialog";
import ImportDialog from "./dialogs/import_dialog";


const Menu = (props) => {

    useEffect(()=>{
        props.setTitle("Меню")
    })

    useEffect(()=>{
        fetch("http://localhost:8000/students/all",{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                setStudentsData(data)
            })
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
                setRequestsData((requestsWithCorrectTime))
            })
    },[])

    const TablePage = () => {
        window.location.href='/tables';
    }

    const UsersPage = () => {
        window.location.href='/users';
    }

    const StatPage = () => {
        window.location.href='/statistics';
    }

    const LogOut = () => {
        window.location.href='/';
    }

    const [isExportDialogVisible, setIsExportDialogVisible] = useState(false)
    const [isImportDialogVisible, setIsImportDialogVisible] = useState(false)
    const [studentsData, setStudentsData] = useState(null)
    const [requestsData, setRequestsData] = useState(null)

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <ExportDialog
                visible={isExportDialogVisible}
                setVisible={setIsExportDialogVisible}
                data={{
                    studentsData,
                    requestsData
                }}
            />
            <ImportDialog
                visible={isImportDialogVisible}
                setVisible={setIsImportDialogVisible}
            />
            <button
                className='MenuButton'
                style={{marginTop: 50}}
                onClick={TablePage}
            >
                Таблицы
            </button>
            <button
                className='MenuButton'
                onClick={UsersPage}
            >
                Пользователи
            </button>
            <button
                className='MenuButton'
                onClick={StatPage}
            >
                Статистика
            </button>
            <button
                className='defaultButton'
                style={{background: '#62A3E7', marginTop: 20, fontSize: 18, minWidth: 100}}
                onClick={()=>{
                    setIsImportDialogVisible(true)
                    console.log(studentsData,requestsData)
                }}
            >
                Импорт
            </button>
            <button
                className='defaultButton'
                style={{background: '#62A3E7', marginTop: 20, fontSize: 18, minWidth: 100}}
                onClick={()=>{setIsExportDialogVisible(true)}}
            >
                Экспорт
            </button>
            <button
                className='defaultButton'
                style={{marginTop: 60, marginRight: 212}}
                onClick={LogOut}
            >
                Выйти
            </button>

        </div>
    );
};

export default Menu;