import React, {useEffect, useState} from 'react';
import "../style/users.css"
import CreateIcon from '@mui/icons-material/Create';
import AddUserDialog from "./dialogs/add_user_dialog";
import EditUserDialog from "./dialogs/edit_user_dialog";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Users = (props) => {

    const pageSize = 2

    useEffect(()=>{
        props.setTitle("Пользователи")
    })

    const MenuPage = () => {
        window.location.href='/menu';
    }

    const [users,setUsers] = useState([])
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
                    setUsers(data.students)
                    fetch("http://localhost:8000/students/count/?",{
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then(res=>res.json())
                        .then(data=>{
                            if (data.length>0) {
                                setTotalUsers(data[0].total)
                            }
                        })
                    setCurrentPage(0)
                    setSearchValues(['','','',''])
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
                    setUsers(data.students)
                    fetch("http://localhost:8000/students/count/?",{
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then(res=>res.json())
                        .then(data=>{
                            if (data.length>0) {
                                setTotalUsers(data[0].total)
                            }
                        })
                    setCurrentPage(0)
                    setSearchValues(['','','',''])
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
        const urlParams = new URLSearchParams({})
        for (let i=0;i<4;i++){
            if (searchValues[i].length>0){
                urlParams.append(filterParams[i],searchValues[i])
            }
        }
        setCurrentPage(0)
        urlParams.append('page',0)
        fetch("http://localhost:8000/students/count/?" + urlParams,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                if (data.length>0) {
                    setTotalUsers(data[0].total)
                }
            })
        fetch("http://localhost:8000/students/?" + urlParams,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                setUsers(data)
            })
    }

    const clearFilterValues = ()=>{
        const urlParams = new URLSearchParams({})
        urlParams.append('page',0)
        fetch("http://localhost:8000/students/count/?" + urlParams,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                if (data.length>0) {
                    setTotalUsers(data[0].total)
                }
            })
        fetch("http://localhost:8000/students/?"+urlParams,{
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                            .then(res=>res.json())
                            .then(data=>{
                                console.log(data)
                                setUsers(data)
                            })
        setSearchValues(['','','',''])
    }

    const [currentPage,setCurrentPage] = useState(0)
    const [totalUsers,setTotalUsers] = useState(0)


    useEffect(()=>{
        const urlParams = new URLSearchParams({})
        urlParams.append("page",currentPage)
        fetch("http://localhost:8000/students/count/?" + urlParams,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                if (data.length>0) {
                    setTotalUsers(data[0].total)
                }
            })
        fetch("http://localhost:8000/students/?" + urlParams,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                setUsers(data)
            })
    },[])

    const updatePage = (delta)=>{
        const urlParams = new URLSearchParams({})
        for (let i=0;i<4;i++){
            if (searchValues[i].length>0){
                urlParams.append(filterParams[i],searchValues[i])
            }
        }
        urlParams.append("page",currentPage+delta)
        fetch("http://localhost:8000/students/?" + urlParams,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res=>res.json())
            .then(data=>{
                if (data.length>0){
                    setCurrentPage(currentPage+delta)
                    setUsers(data)
                }
            })
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
            {users.length===0 ? null : <div style={{textAlign:'end',marginRight:20}}>
                {currentPage>0 ? <KeyboardArrowLeftIcon
                    style={{background: "#62A3E7",
                        border: '2px solid rgba(40, 96, 173, 1)',
                        borderRadius: 5,
                        color: "white",
                        verticalAlign:"middle",
                        cursor:'pointer'}}
                    onClick={()=>{updatePage(-1)}}
                ></KeyboardArrowLeftIcon> : null}
                <span style={{color: "#1A4297", fontSize: 20, paddingLeft: 5, paddingRight: 5, fontWeight:'bold'}}>{currentPage+1}</span>
                <KeyboardArrowRightIcon
                    style={{background: "#62A3E7",
                        border: '2px solid rgba(40, 96, 173, 1)',
                        borderRadius: 5,
                        color: "white",
                        verticalAlign:"middle",
                        cursor:'pointer',
                        filter: (currentPage+1)*pageSize >= totalUsers ? "blur(2px)" : "",
                        pointerEvents: (currentPage+1)*pageSize >= totalUsers ? "none" : "auto"
                    }}
                    onClick={()=>{updatePage(1)}}
                >
                </KeyboardArrowRightIcon>
            </div>}
            <div style={{overflow: "auto",maxHeight:300, marginTop:10}}>
                {users.length>0 ? <table className="MyTable" style={{minWidth:700}}>
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
                    {users.map(user=>
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