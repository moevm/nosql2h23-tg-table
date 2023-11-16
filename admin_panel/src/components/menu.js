import React, {useEffect} from 'react';
import "../style/menu.css"


const Menu = (props) => {

    useEffect(()=>{
        props.setTitle("Меню")
    })

    const TablePage = () => {
        window.location.href='/tables';
    }

    const UsersPage = () => {
        window.location.href='/users';
    }

    const StatPage = () => {
        window.location.href='/statistics';
    }

    const LogOut = () => {
        window.location.href='/';
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <button
                className='MenuButton'
                style={{marginTop: 50}}
                onClick={TablePage}
            >
                Таблицы
            </button>
            <button
                className='MenuButton'
                onClick={UsersPage}
            >
                Пользователи
            </button>
            <button
                className='MenuButton'
                onClick={StatPage}
            >
                Статистика
            </button>
            <button
                className='defaultButton'
                style={{marginTop: 60, marginRight: 212}}
                onClick={LogOut}
            >
                Выйти
            </button>

        </div>
    );
};

export default Menu;