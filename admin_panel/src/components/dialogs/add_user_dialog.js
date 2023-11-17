import React, {useState} from 'react';
import BaseDialog from "../base_dialog";

const AddUserDialog = (props) => {
    const [name,setName] = useState("")
    const [groupNumber,setGroupNumber] = useState("")
    const [telegramId,setTelegramId] = useState("")

    const addUser = ()=>{
        if (name.length===0 || groupNumber.length===0 || telegramId.length===0){
            alert("Пожалуйста, заполните все поля!")
            return
        }
        const newUser = {
            name,
            groupNumber,
            telegramId
        }
        props.addUserFun(newUser)

        props.setVisible(false)
        setName("")
        setGroupNumber("")
        setTelegramId("")
    }

    return (
        <div>
            <BaseDialog visible={props.visible} setVisible={props.setVisible}>
                <div style={{display:"flex", flexDirection:"column",fontSize: 22}}>
                    <table style={{borderSpacing: 15,textAlign:"end"}}>
                        <tbody>
                        <tr>
                            <td>
                                <span>ФИО: </span>
                            </td>
                            <td style={{textAlign:"end"}}>
                                <input
                                    type='text'
                                    required
                                    className="myInput"
                                    value={name}
                                    onChange={(e)=>{setName(e.target.value)}}
                                />
                            </td>
                        </tr>
                        <tr >
                            <td style={{textAlign:"end"}}>
                                <span>Группа: </span>
                            </td>
                            <td>
                                <input
                                    type='text'
                                    required
                                    className="myInput"
                                    value={groupNumber}
                                    onChange={(e)=>{setGroupNumber(e.target.value)}}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"end"}}>
                                <span>Telegram_ID: </span>
                            </td>
                            <td>
                                <input
                                    type='text'
                                    required
                                    className="myInput"
                                    value={telegramId}
                                    onChange={(e)=>{setTelegramId(e.target.value)}}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div style={{display:"flex", flexDirection:"row",marginTop:20}}>
                        <button
                            className='defaultButton'
                            style={{marginRight:"auto"}}
                            onClick={addUser}
                        >
                            Добавить
                        </button>
                        <button
                            className='defaultButton'
                            style={{marginLeft:"auto"}}
                            onClick={()=>{
                                props.setVisible(false)
                                setName("")
                                setGroupNumber("")
                                setTelegramId("")
                            }}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </BaseDialog>
        </div>
    );
};

export default AddUserDialog;