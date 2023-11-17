import React, {useState} from 'react';
import GroupListItem from "./group_list_item";
import AddIcon from '@mui/icons-material/Add';
import BaseDialog from "../base_dialog";
import "../../style/tables.css"

const GroupList = (props) => {
    const addGroup = ()=>{
        const group = {groupNumber: addGroupInputText}
        const newGroups = [...props.groups]
        newGroups.push(group)
        props.updateGroupList(newGroups)
        closeAddGroupDialog()
    }
    const removeGroup = (number)=>{
        const newGroups = [...props.groups].filter(e => {return e.groupNumber!==number})
        props.updateGroupList(newGroups)
    }
    const closeAddGroupDialog = ()=>{
        setAddGroupInputText("")
        setIsAddDialogVisible(false)
    }
    const [addGroupInputText, setAddGroupInputText] = useState("")
    const [isAddGroupDialogVisible , setIsAddDialogVisible] = useState(false)
    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            {props.groups.map(group=>
                <GroupListItem key={group.groupNumber} group={group} onRemoveGroup={removeGroup}/>
            )}
            <div style={{background:"white", cursor:"pointer"}} onClick={()=>{setIsAddDialogVisible(true)}}>
                <AddIcon style={{fontSize: 20, verticalAlign: "middle"}}/>
                <BaseDialog visible={isAddGroupDialogVisible} setVisible={setIsAddDialogVisible} style={{}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <span style={{width:300, marginTop:3, marginRight:10,textAlign:"end"}}>Номер группы:</span>
                            <input
                                type="text"
                                value={addGroupInputText}
                                onChange={(e)=>{setAddGroupInputText(e.target.value)}}
                                required
                                className="myInput"
                            />
                        </div>
                        <div style={{display: "flex", flexDirection: "row", marginTop: 30}}>
                            <button
                                className='defaultButton'
                                style={{marginRight:"auto"}}
                                onClick={addGroup}
                            >
                                Добавить
                            </button>
                            <button
                                className='defaultButton'
                                style={{marginLeft:"auto"}}
                                onClick={closeAddGroupDialog}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </BaseDialog>
            </div>
        </div>
    );
};

export default GroupList;