import React, {useEffect, useState} from 'react';
import BaseDialog from "../base_dialog";

class EditUserDialog extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name : props.user.name,
            groupNumber : props.user.groupNumber,
            telegramId : props.user.telegramId,
            oldUser: props.user
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            name : nextProps.user.name,
            groupNumber : nextProps.user.groupNumber,
            telegramId : nextProps.user.telegramId,
            oldUser: nextProps.user
        })
    }

    deleteUser = () => {
        this.props.deleteUserFun(this.state.oldUser)
        this.props.setVisible(false)
    }

    editUser = ()=>{
        const user = {
            id: this.state.oldUser.id,
            name : this.state.name,
            groupNumber : this.state.groupNumber,
            telegramId : this.state.telegramId,
            requestCount : this.state.oldUser.requestCount
        }
        this.props.editUserFun(this.state.oldUser,user)
        this.props.setVisible(false)
    }

    render() {
        return <div>
            <BaseDialog visible={this.props.visible} setVisible={this.props.setVisible}>
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
                                    value={this.state.name}
                                    onChange={(event)=>{this.setState({
                                        name: event.target.value
                                    })}}
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
                                    value={this.state.groupNumber}
                                    onChange={(event)=>{this.setState({
                                        groupNumber: event.target.value
                                    })}}
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
                                    value={this.state.telegramId}
                                    onChange={(event)=>{this.setState({
                                        telegramId: event.target.value
                                    })}}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div style={{display:"flex", flexDirection:"row",marginTop:20}}>
                        <button
                            className='defaultButton'
                            style={{marginRight:"auto"}}
                            onClick={this.editUser}
                        >
                            Применить
                        </button>
                        <button
                            className='defaultButton'
                            style={{marginRight:"auto", background: "#FF0000"}}
                            onClick={this.deleteUser}
                        >
                            Удалить
                        </button>
                        <button
                            className='defaultButton'
                            style={{marginLeft:"auto"}}
                            onClick={()=>{
                                this.props.setVisible(false)
                            }}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </BaseDialog>
        </div>
    }
}

export default EditUserDialog;