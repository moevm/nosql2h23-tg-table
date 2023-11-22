import React, {useEffect, useState} from 'react';
import {useMutation} from 'react-query'
import "../style/login.css"
import "../style/app.css"

const Login = (props) => {
    const [email, setEmail]=useState('')
    const [password, setPassword] = useState('')

    const [user,setUser] = useState(null)
    const {mutate,isLoading} = useMutation(
        'login',
        ()=>{
            fetch("http://localhost:8000/users/",{
                method: 'GET'
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    // setUser(data.user)
                })
            // window.location.href='/menu';
        }
    )
    useEffect(()=>{
        props.setTitle("Авторизация")
    })
    return (
        <div className="login">
            <div className="form">
                {user == null ?
                <form className='login-form'>
                    <input
                        type='text'
                        placeholder='email'
                        required
                        style={{marginTop: 25}}
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='password'
                        required
                        style={{marginTop: 25}}
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <button
                        className='defaultButton'
                        onClick={mutate}
                        disabled={isLoading}
                        style={{marginTop: 60}}
                    >
                        Войти
                    </button>
                </form>
                : <span className='material-text'>
                     {user?.email}, авторизация прошла успешно! :)
                </span>}
            </div>
        </div>
    );
};

export default Login;