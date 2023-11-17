import React, {useEffect, useState} from 'react';
import "../style/users.css"
import CreateIcon from '@mui/icons-material/Create';
import AddUserDialog from "./dialogs/add_user_dialog";
import EditUserDialog from "./dialogs/edit_user_dialog";

const Users = (props) => {
    useEffect(()=>{
        props.setTitle("Пользователи")
    })
    let users = [
        {
            id: 1,
            groupNumber: "0382",
            name: "Чегодаев Кондратий Сергеев",
            telegramId: "dizadan",
            requestCount: 54
        },
        {
            id: 2,
            groupNumber: "4333",
            name: "Сергеев Дмитрий Андреевич",
            telegramId: "dise0126",
            requestCount: 1
        },
        {
            id: 3,
            groupNumber: "0382",
            name: "Чегодаева Елизавета Александровна <3",
            telegramId: "elizache",
            requestCount: 100000
        },
        {
            id: 4,
            groupNumber: "7777",
            name: "Кондратов Юрий Александрович",
            telegramId: "kordan04",
            requestCount: 33
        },
    ]

    const MenuPage = () => {
        window.location.href='/menu';
    }

    const [currentUsers, setCurrentUsers] = useState(users)
    const [isEditUserDialogVisible, setIsEditUserDialogVisible] = useState(false)
    const [currentEditUser, setCurrentEditUser] = useState(users[0])
    const [isAddUserDialogVisible,setIsAddUserDialogVisible] = useState(false)
    const filterUsers = (param)=>{
        if (param===""){
            setCurrentUsers(users)
        } else {
            const newUsers = [...users].filter(e=>e.groupNumber===param)
            setCurrentUsers(newUsers)
        }
    }
    const addUser = (user)=>{
        user.id = users.length+1
        user.requestCount = 0
        const newUsers = [...users]
        newUsers.push(user)
        setCurrentUsers(newUsers)
        users = newUsers
    }
    const editUser = (oldUser,newUser)=>{
        let newUsers = [...users]
        newUsers = newUsers.map(item=> item.id===oldUser.id ? newUser : item)
        setCurrentUsers(newUsers)
        users = newUsers
    }
    const deleteUser = (user)=>{
        let newUsers = [...users].filter(e=>e.id!==user.id)
        setCurrentUsers(newUsers)
        users = newUsers
    }
    const launchEditUserDialog = (user)=>{
        setCurrentEditUser(user)
        setIsEditUserDialogVisible(true)
    }
    return (
        <div >
            <EditUserDialog
                visible={isEditUserDialogVisible}
                setVisible={setIsEditUserDialogVisible}
                editUserFun={editUser}
                deleteUserFun={deleteUser}
                user={currentEditUser}
            />
            <div style={{display: "flex", flexDirection: "column", minWidth: 400}}>
                <button
                    className='defaultButton'
                    style={{background: '#62A3E7', marginLeft:"auto", fontSize: 18, minWidth: 100}}
                >
                    Импорт
                </button>
                <button
                    className='defaultButton'
                    style={{background: '#62A3E7', marginTop: 15, marginLeft:"auto", fontSize: 18, minWidth: 100}}
                >
                    Экспорт
                </button>
            </div>
            <div className="params">
                <span>Параметр:</span>
                <select style={{marginLeft: 10, fontSize: 18}} onChange={(event)=>{filterUsers(event.target.value)}}>
                    <option value={""}>
                        Все
                    </option>
                    {(Array.from(new Set(currentUsers.map(e=>e.groupNumber))).map(number=>
                        <option key={number} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
            </div>
            <div style={{overflow: "auto",maxHeight:300}}>
                <table className="MyTable" style={{minWidth:700}}>
                    <thead>
                    <tr>
                        <th>
                            Группа
                        </th>
                        <th>
                            ФИО
                        </th>
                        <th>
                            Telegram_ID
                        </th>
                        <th>
                            Обращения
                        </th>
                        <th style={{background: "#1A4297", color: "white"}}>
                            Править
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentUsers.map(user=>
                        <tr key={user.id}>
                            <td>
                                {user.groupNumber}
                            </td>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                {user.telegramId}
                            </td>
                            <td>
                                {user.requestCount}
                            </td>
                            <td>
                                <CreateIcon style={{color: "#1A4297",cursor:"pointer"}} onClick={()=>{launchEditUserDialog(user)}}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <AddUserDialog visible={isAddUserDialogVisible} setVisible={setIsAddUserDialogVisible} addUserFun={addUser}/>
                <button
                    className='defaultButton'
                    style={{marginLeft: 60, fontSize: 18, marginTop: 25, paddingLeft: 10, paddingRight: 10}}
                    onClick={()=>setIsAddUserDialogVisible(true)}
                >
                    + Добавить пользователя
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

export default Users;