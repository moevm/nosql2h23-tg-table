import React, {useState} from 'react';
import './style/app.css'
import TelegramIcon from '@mui/icons-material/Telegram';
import Login from "./components/login";


const App = () => {
    const [title,setTitle] = useState("");

    const setTitleComponent = (_title)=>{
        setTitle(_title)
    }

    return (
        <div className='Root'>
            <h1 className='TitleApp'> Панель администрирования telegram-bot</h1>
            <div className='BaseComponent'>
                <h1 className='TitleComponent'>{title}</h1>
                <Login setTitle={setTitleComponent}/>
                <TelegramIcon sx={{ color: "#2860AD", fontSize: 95, marginLeft:"auto"}}/>
            </div>
        </div>
    );
};

export default App;