import React, {useEffect, useState} from 'react';
import "../style/users.css"
import CreateIcon from '@mui/icons-material/Create';
import AddUserDialog from "./dialogs/add_user_dialog";
import EditUserDialog from "./dialogs/edit_user_dialog";

const Users = (props) => {
    useEffect(()=>{
        props.setTitle("Пользователи")
    })

    useEffect(()=>{
        fetch("http://localhost:8000/students/",{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                setUsers(data)
                setCurrentUsers(data)
            })
    },[])

    const MenuPage = () => {
        window.location.href='/menu';
    }

    const [users,setUsers] = useState([])
    const [currentUsers, setCurrentUsers] = useState([])
    const [isEditUserDialogVisible, setIsEditUserDialogVisible] = useState(false)
    const [currentEditUser, setCurrentEditUser] = useState({_id:"",name:"",telegramId:"",groupNumber:""})
    const [isAddUserDialogVisible,setIsAddUserDialogVisible] = useState(false)

    const resetFilter = ()=>{
        const select = document.getElementById("select_user")
        select.value = ""
    }

    const filterUsers = (param)=>{
        if (param===""){
            setCurrentUsers(users)
        } else {
            const newUsers = [...users].filter(e=>e.groupNumber===param)
            setCurrentUsers(newUsers)
        }
    }
    const addUser = (user)=>{
        const body = {
            groupNumber: user.groupNumber,
            name: user.name,
            telegramId: user.telegramId,
        }
        fetch("http://localhost:8000/students/add_student",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(res=>res.json())
            .then(data=>{
                if (data.status===201){
                    user._id = data._id
                    user.requestCount = 0
                    const newUsers = [...users]
                    newUsers.push(user)
                    setCurrentUsers(newUsers)
                    setUsers(newUsers)
                } else {
                    alert("Произошла ошибка")
                }
            })
    }
    const editUser = (oldUser,newUser)=>{
        const updatedUser = {
            _id: oldUser._id,
            groupNumber: newUser.groupNumber,
            telegramId: newUser.telegramId,
            name: newUser.name,
            requestCount: oldUser.requestCount
        }
        fetch("http://localhost:8000/students/update_student",{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res=>res.json())
            .then((data)=>{
                if (data.status===200){
                    let newUsers = [...users]
                    newUsers = newUsers.map(item=> item._id===oldUser._id ? updatedUser : item)
                    setCurrentUsers(newUsers)
                    setUsers(newUsers)
                } else {
                    alert("Не удалось отредактировать данные")
                }
            })
    }
    const deleteUser = (user)=>{
        fetch("http://localhost:8000/students/delete_student",{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then(res=>res.json())
            .then((data)=>{
                if (data.status===200){
                    let newUsers = [...users].filter(e=>e._id!==user._id)
                    setCurrentUsers(newUsers)
                    setUsers(newUsers)
                } else {
                    alert("Удаление не удалось")
                }
            })
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
            <div className="params">
                <span>Параметр:</span>
                <select id="select_user" style={{marginLeft: 10, fontSize: 18}} onChange={(event)=>{filterUsers(event.target.value)}}>
                    <option value={""}>
                        Все
                    </option>
                    {(Array.from(new Set(users.map(e=>e.groupNumber))).map(number=>
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
                        <tr key={user._id}>
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