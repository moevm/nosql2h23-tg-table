import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const GroupListItem = (props) => {
    return (
        <div style={{display: "flex", flexDirection: "row", width: "fit-content", background: "white", marginRight:10, padding:2}}>
            <span>{props.group.groupNumber}</span>
            <CloseIcon
                style={{color: "red", fontSize:20, marginTop: 2, cursor:"pointer"}}
                onClick={()=>{props.onRemoveGroup(props.group.groupNumber)}}
            />
        </div>
    );
};

export default GroupListItem;