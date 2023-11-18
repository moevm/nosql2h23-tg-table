import React, {useState} from 'react';
import BaseDialog from "../base_dialog";
import DownloadIcon from '@mui/icons-material/Download';

const ExportDialog = (props) => {
    const downloadFile = async ()=>{
        const data = {data: props.data}
        const blob = new Blob([JSON.stringify(data)],{type : 'application/json'})
        const a = document.createElement('a');
        a.download = `${filename}.json`
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
        setFilename('')
        props.setVisible(false)
    }

    const [filename,setFilename] = useState('')

    return (
        <BaseDialog visible={props.visible} setVisible={props.setVisible}>
            <div style={{display:"flex",flexDirection: "column"}}>
                <span>Назовите файл для экспорта</span>
                <div style={{display:"flex",flexDirection:"row",marginTop:10}}>
                    <label form="filename" style={{marginRight: 5, marginTop:1}}>Имя файла:</label>
                    <input
                        name="filename"
                        id="filename"
                        type="text"
                        style={{minWidth:250}}
                        value={filename}
                        onChange={(event)=>{setFilename(event.target.value)}}
                    />
                    <span>.json</span>
                </div>
                <div style={{display:"flex", flexDirection:"row", marginTop:20}}>
                    <button
                        className='defaultButton'
                        style={{marginRight:"auto", fontSize: 18, paddingLeft: 10, paddingRight: 10}}
                        onClick={downloadFile}
                    >
                        <DownloadIcon style={{verticalAlign:"middle",marginRight:5}}/>
                        Скачать
                    </button>
                    <button
                        className='defaultButton'
                        style={{marginLeft: "auto", fontSize: 18,paddingLeft: 10, paddingRight: 10}}
                        onClick={()=>{props.setVisible(false)}}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </BaseDialog>
    );
};

export default ExportDialog;