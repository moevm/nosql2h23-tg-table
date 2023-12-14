import React, {useEffect, useState} from 'react';
import "../style/users.css"
import CreateIcon from '@mui/icons-material/Create';
import AddUserDialog from "./dialogs/add_user_dialog";
import EditUserDialog from "./dialogs/edit_user_dialog";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";

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
    const [searchValues,setSearchValues] = useState([
        '','','',''
    ])

    const setSearchValue = (index,value)=>{
        const newSearchValues = searchValues.map((elem,ind)=>{
            if (ind===index){
                return value
            } else{
                return  elem
            }
        })
        setSearchValues(newSearchValues)
    }
    //
    // const resetFilter = ()=>{
    //     const select = document.getElementById("select_user")
    //     select.value = ""
    // }
    //
    // const filterUsers = (param)=>{
    //     if (param===""){
    //         setCurrentUsers(users)
    //     } else {
    //         const newUsers = [...users].filter(e=>e.groupNumber===param)
    //         setCurrentUsers(newUsers)
    //     }
    // }
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

    const filterParams = ["groupNumber","name","telegramId",'requestCount']

    const filterUsers = ()=>{
        let newUsers = [...currentUsers]
        for (let i=0;i<4;i++){
            if (searchValues[i].length>0){
                const searchValue = searchValues[i]
                const currentFilter = filterParams[i]
                if (i===3){
                    newUsers= newUsers.filter(e=>{
                        return  _.get(e,`${currentFilter}`)===Number(searchValue)
                    })
                } else {
                    newUsers= newUsers.filter(e=>{
                        return  _.get(e,`${currentFilter}`).toString().toLowerCase().includes(searchValue.toLowerCase())
                    })
                }
            }
        }
        setCurrentUsers(newUsers)
    }

    const clearFilterValues = ()=>{
        setCurrentUsers(users)
        setSearchValues(['','','',''])
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
            {/*<div className="params">*/}
            {/*    <span>Параметр:</span>*/}
            {/*    <select id="select_user" style={{marginLeft: 10, fontSize: 18}} onChange={(event)=>{filterUsers(event.target.value)}}>*/}
            {/*        <option value={""}>*/}
            {/*            Все*/}
            {/*        </option>*/}
            {/*        {(Array.from(new Set(users.map(e=>e.groupNumber))).map(number=>*/}
            {/*            <option key={number} value={number}>*/}
            {/*                {number}*/}
            {/*            </option>*/}
            {/*        ))}*/}
            {/*    </select>*/}
            {/*</div>*/}
            <div style={{overflow: "auto",maxHeight:300}}>
                {currentUsers.length>0 ? <table className="MyTable" style={{minWidth:700}}>
                    <thead>
                    <tr>
                        <th>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <span  style={{marginLeft: 5, fontSize:18}}>
                                   Группа
                                </span>
                                <div style={{marginLeft: 10, padding: 0}}>
                                    <input className="myInput"
                                           style={{width:100,fontSize:17,paddingTop:0, background: "#C0DAF5"}}
                                           value={searchValues[0]}
                                           onChange={(e)=>{setSearchValue(0,e.target.value)}}/>
                                    <SearchIcon style={{verticalAlign:"middle"}}/>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <span  style={{marginLeft: 5, fontSize:18}}>
                                   ФИО
                                </span>
                                <div style={{marginLeft: 10, padding: 0}}>
                                    <input className="myInput"
                                           style={{width:100,fontSize:17,paddingTop:0, background: "#C0DAF5"}}
                                           value={searchValues[1]}
                                           onChange={(e)=>{setSearchValue(1,e.target.value)}}/>
                                    <SearchIcon style={{verticalAlign:"middle"}}/>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <span  style={{marginLeft: 5, fontSize:18}}>
                                   Telegram_ID
                                </span>
                                <div style={{marginLeft: 10, padding: 0}}>
                                    <input className="myInput"
                                           style={{width:100,fontSize:17,paddingTop:0, background: "#C0DAF5"}}
                                           value={searchValues[2]}
                                           onChange={(e)=>{setSearchValue(2,e.target.value)}}/>
                                    <SearchIcon style={{verticalAlign:"middle"}}/>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <span  style={{marginLeft: 5, fontSize:18}}>
                                   Обращения
                                </span>
                                <div style={{marginLeft: 10, padding: 0}}>
                                    <input className="myInput"
                                           style={{width:100,fontSize:17,paddingTop:0, background: "#C0DAF5"}}
                                           value={searchValues[3]}
                                           onChange={(e)=>{setSearchValue(3,e.target.value)}}/>
                                    <SearchIcon style={{verticalAlign:"middle"}}/>
                                </div>
                            </div>
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
                </table> : <span style={{fontSize:30,fontFamily:"Comfortaa",color:"white"}}>Данные не найдены</span>}
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <button
                        className='defaultButton'
                        style={{marginLeft: 60, fontSize: 15, marginTop: 25,
                            paddingLeft: 10, paddingRight: 10, background: "#62A3E7",
                            border: '2px solid rgba(40, 96, 173, 1)'}}
                        onClick={()=>filterUsers()}
                    >
                        Применить фильтры
                    </button>
                    <button
                        className='defaultButton'
                        style={{marginLeft: 60, fontSize: 15, marginTop: 25,
                            paddingLeft: 10, paddingRight: 10, background: "#62A3E7",
                            border: '2px solid rgba(40, 96, 173, 1)'}}
                        onClick={()=> {
                            clearFilterValues()
                        }}
                    >
                        Сбросить фильтрацию
                    </button>
                </div>
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