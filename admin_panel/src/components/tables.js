import React, {useEffect, useState} from 'react';
import "../style/tables.css"
import CloseIcon from '@mui/icons-material/Close';

const Tables = (props) => {
    const MenuPage = () => {
        window.location.href='/menu';
    }

    const [tablesList, setTablesList] = useState([
        {id: 1, name: '[Урмф] 0382, 0383'},
        {id: 2, name: '[PR] 1243, 9999, 1010'},
        {id: 3, name: '[БЖД] 0382'},])
    useEffect(()=>{
        props.setTitle("Таблицы")
    })
    return (
        <div>
            <div>
                {tablesList.map(table =>
                    <div className='tablesListItem' key = {table.id} onClick={()=>{
                        console.log(456)}}>
                        {table.name}
                        <CloseIcon sx={{float: "right", color: "#EE0100"}} onClick={(e)=>{
                            e.stopPropagation()
                            console.log(123)}}/>
                    </div>
                )}
                <button
                    className='defaultButton'
                    style={{background: '#016EB2'}}
                    onClick={MenuPage}
                >
                    Добавить таблицу
                </button>
            </div>

            <button
                className='defaultButton'
                style={{marginTop: 60, marginRight: 305, fontSize: 25}}
                onClick={MenuPage}
            >
                Назад
            </button>

        </div>
    );
};

export default Tables;