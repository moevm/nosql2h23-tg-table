import React, {useState} from 'react';
import './style/app.css'
import Login from "./components/login";
import TelegramIcon from '@mui/icons-material/Telegram';
import {RouterProvider} from "react-router-dom";
import {
    createBrowserRouter,
} from "react-router-dom";
import Menu from "./components/menu";
import Tables from "./components/tables";
import Statistics from "./components/statistics";
import Users from "./components/users";
import ConcreteTable from "./components/concrete_table";
import {CircularProgress} from "@mui/joy";


const App = () => {
    const [title,setTitle] = useState("");

    const setTitleComponent = (_title)=>{
        setTitle(_title)
    }

    const [isLoading,setIsLoading] = useState(false)
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login setTitle={setTitleComponent} setLoading={setIsLoading}/>,
        },
        {
            path: 'menu',
            element: <Menu setTitle={setTitleComponent}/>
        },
        {
            path: 'tables',
            element: <Tables setTitle={setTitleComponent} setLoading={setIsLoading}/>
        },
        {
            path: 'users',
            element: <Users setTitle={setTitleComponent}/>
        },
        {
            path: 'statistics',
            element: <Statistics setTitle={setTitleComponent}/>
        },
        {
            path: 'table/:id',
            element: <ConcreteTable setTitle={setTitleComponent} setLoading={setIsLoading}/>
        }
    ]);
    return (
        <div className='Root'>
            <div style={{visibility: isLoading ? "visible" : "hidden", position:'absolute',top:"45%",left:"36%", zIndex:1000,textAlign:"center"}}>
                <p style={{color: "#2860AD", fontSize:26}}>Идёт загрузка, пожалуйста подождите...</p>
                <CircularProgress></CircularProgress>
            </div>
            <h1 className='TitleApp'> Панель администрирования telegram-bot</h1>
            <div style={{filter: isLoading ? "blur(25px)" : "", pointerEvents: isLoading ? "none" : "auto"}} className='BaseComponent'>
                <h1 className='TitleComponent'>{title}</h1>
                <RouterProvider  router={router}/>
                <TelegramIcon sx={{ color: "#2860AD", fontSize: 95, marginLeft:"auto"}}/>
            </div>
        </div>
    );
};

export default App;