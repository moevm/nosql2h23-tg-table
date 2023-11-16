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
import Concrete_table from "./components/concrete_table";
import ConcreteTable from "./components/concrete_table";


const App = () => {
    const [title,setTitle] = useState("");

    const setTitleComponent = (_title)=>{
        setTitle(_title)
    }


    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login setTitle={setTitleComponent}/>,
        },
        {
            path: 'menu',
            element: <Menu setTitle={setTitleComponent}/>
        },
        {
            path: 'tables',
            element: <Tables setTitle={setTitleComponent}/>
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
            element: <ConcreteTable setTitle={setTitleComponent}/>
        }
    ]);
    return (
        <div className='Root'>
            <h1 className='TitleApp'> Панель администрирования telegram-bot</h1>
            <div className='BaseComponent'>
                <h1 className='TitleComponent'>{title}</h1>
                <RouterProvider router={router}/>
                <TelegramIcon sx={{ color: "#2860AD", fontSize: 95, marginLeft:"auto"}}/>
            </div>
        </div>
    );
};

export default App;