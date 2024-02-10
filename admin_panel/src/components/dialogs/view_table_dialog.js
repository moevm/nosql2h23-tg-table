import React from 'react';
import BaseDialog from "../base_dialog";

const ViewTableDialog = (props) => {
    console.log(props.visible)
    return (
        <div>
            <BaseDialog visible={props.visible} setVisible={props.setVisible}>
                <iframe title="Превью таблицы" src={props.link} width="1000" height="600"></iframe>
                <div style={{display:"flex", flexDirection:"row",marginTop:20}}>
                    <button
                        className='defaultButton'
                        style={{background: '#1A4297', marginTop: 15, marginRight:"auto", fontSize: 18, minWidth: 100}}
                        onClick={()=>{props.setVisible(false)}}
                    >
                        Назад
                    </button>
                </div>
            </BaseDialog>
        </div>
    );
};

export default ViewTableDialog;