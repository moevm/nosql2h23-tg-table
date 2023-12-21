import React, {useRef, useState} from 'react';
import BaseDialog from "../base_dialog";

const ImportDialog = (props) => {

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const handleFileChange = (e)=>{
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name)
        }
    }

    const studentsProperties=['_id','groupNumber','name','telegramId']
    const requestsProperties = ["_id","timestamp","student","spreadsheet"]

    const applyImport = ()=>{
        if (file){
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function() {
                const res = JSON.parse(reader.result)
                if (res.hasOwnProperty("data")){
                    if (res.data.hasOwnProperty('studentsData') && res.data.hasOwnProperty('requestsData')){
                        let flag = true
                        outerLoop:
                            for (const element of res.data.studentsData){
                                for (const property of studentsProperties){
                                    if (!element.hasOwnProperty(property)){
                                        flag=false
                                        break outerLoop
                                    }
                                }
                            }
                        outerLoop:
                            for (const element of res.data.requestsData){
                                for (const property of requestsProperties){
                                    if (!element.hasOwnProperty(property)){
                                        flag=false
                                        break outerLoop
                                    }
                                }
                            }
                        if (flag){
                            for (const i of res.data.requestsData.keys()){
                                res.data.requestsData[i].timestamp = new Date(res.data.requestsData[i].timestamp)
                            }
                            fetch(`http://localhost:8000/students`,{
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(res.data.studentsData)
                            })
                                .then(res=>res.json())
                                .then(data=>{
                                    if (data.status===200){
                                        setFile(null)
                                        setFilename('')
                                    } else {
                                        flag = false
                                        alert("Ошибка")
                                    }
                                })
                            fetch(`http://localhost:8000/requests`,{
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(res.data.requestsData)
                            })
                                .then(res=>res.json())
                                .then(data=>{
                                    if (data.status===200){
                                        setFile(null)
                                        setFilename('')
                                    } else {
                                        flag = false
                                        alert("Ошибка")
                                    }
                                })
                            if (flag){
                                props.setVisible(false)
                            }
                        } else {
                            alert("Ошибка в содержимом файла")
                        }
                    } else {
                        alert("Ошибка в содержимом файла")
                    }
                } else {
                    alert("Ошибка в содержимом файла")
                }
            };
            reader.onerror = function(){
                alert("Ошибка при чтении фалйа")
            }
        }
    }

    const [filename,setFilename] = useState('')
    const [file,setFile] = useState(null)
    const inputFile = useRef(null)

    return (
        <BaseDialog visible={props.visible} setVisible={props.setVisible}>
            <div style={{display:"flex",flexDirection: "column"}}>
                <span>Выберите файл для импорта в систему</span>
                <div style={{display:"flex",flexDirection:"row",marginTop:10}}>
                    <label form="filename" style={{marginRight: 5, marginTop:1}}>Файл:</label>
                    <input
                        name="filename"
                        id="filename"
                        type="text"
                        style={{minWidth:250}}
                        value={filename}
                        onChange={(event)=>{setFilename(event.target.value)}}
                    />
                    <button
                        style={{background: "#2860ad", marginLeft:5,color:"white",minWidth:50}}
                        onClick={onButtonClick}
                    >
                        ...
                    </button>
                    <input
                        type='file'
                        id='file'
                        ref={inputFile}
                        style={{display: 'none'}}
                        accept="application/JSON"
                        onChange={handleFileChange}
                    />
                </div>
                <div style={{display:"flex", flexDirection:"row", marginTop:20}}>
                    <button
                        className='defaultButton'
                        style={{marginRight:"auto", fontSize: 18, paddingLeft: 10, paddingRight: 10}}
                        onClick={applyImport}
                    >
                        Импорт
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

export default ImportDialog;