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

    const applyImport = ()=>{
        if (file){
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function() {
                const res = JSON.parse(reader.result)
                console.log(res)
                if (res.hasOwnProperty("data")){
                    let flag = true
                    outerLoop:
                    for (const element of res.data){
                        for (const property of props.properties){
                            if (!element.hasOwnProperty(property)){
                                flag=false
                                break outerLoop
                            }
                        }
                    }
                    if (flag){
                        if (props.properties.includes("time")){
                            for (const i of res.data.keys()){
                                res.data[i].time = new Date(res.data[i].time)
                                delete res.data[i].requestCount
                            }
                        }
                        fetch("http://localhost:8000/students/",{
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(res.data)
                        })
                            .then(res=>res.json())
                            .then(data=>{
                                console.log(data)
                                if (data.status===200){
                                    props.setAll(res.data)
                                    props.setCurrent(res.data)
                                    props.filter()
                                    props.setVisible(false)
                                    setFile(null)
                                    setFilename('')
                                } else {
                                    alert("Ошибка")
                                }
                            })
                    } else {
                        alert("Ошибка в формате файла")
                    }
                } else {
                    alert("Ошибка в формате файла")
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