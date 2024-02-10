import React, {useEffect, useState} from 'react';
import "../style/login.css"
import "../style/app.css"

const Login = (props) => {
    const [email, setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [isWrongLogin,setIsWrongLogin] = useState(false)

    const login = ()=>{
        props.setLoading(true)
        setIsWrongLogin(false)
        fetch("http://localhost:8000/login/",{
            method: 'GET',
            headers: {
                "Authorization": email+":"+password
            }
        })
            .then(res=>res.json())
            .then(data=>{
                if (data.status===200){
                    props.setLoading(false)
                    window.location.href = "/menu"
                } else {
                    props.setLoading(false)
                    setIsWrongLogin(true)
                }
            })
    }
    useEffect(()=>{
        props.setTitle("Авторизация")
    })
    return (
        <div className="login">
            <div className="form">
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
                {isWrongLogin ? <span style={{color:"red",textAlign:"start"}}>Вы ввели неверный логин или пароль</span> : null}
                <button
                    className='defaultButton'
                    onClick={login}
                    style={{marginTop: 60}}
                >
                    Войти
                </button>
            </div>
        </div>
    );
};

export default Login;