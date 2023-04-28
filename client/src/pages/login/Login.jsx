import React, { useState } from 'react';
import "../register/register.css";
import _ from "lodash";
import Logo from "../../image/logo.webp";
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';
import Cookies from 'js-cookie';

const Login = () => {
    const INITIAL_STATE = {
        username: "",
        password: "",
    }

    const [data, setData] = useState(INITIAL_STATE);
    const [err, setErr] = useState("");

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/register");
    }

    const handleChange = (e) => {
        e.preventDefault();
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(_.isNil(data.username) || _.isNil(data.password)) {
            return ;
        }
        try {
            const res = await Api.authApi.loginApi(data);
            if(!res.data.success) {
                setErr(res.data.message);
                return ;
            }
            Cookies.set("authen", res.data.token);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='Auth'>
            <div className='a-left'>
                <img src={Logo} alt=''/>
                <div className='Webname'>
                    <h1>ELSA Speak</h1>
                    <h4>Your personal AI-powered English speaking coach</h4>
                </div>
            </div>
            <div className='a-right'>
                <form className='infoForm authForm' onSubmit={handleSubmit}>
                    <h2>Log In</h2>
                    <div>
                        <input
                            placeholder='username'
                            className='infoInput'
                            name='username'
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            placeholder='password'
                            className='infoInput'
                            type='password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    {err && <span style={{
                            color: "red", fontSize: "16px", 
                            alignSelf: "flex-end",
                            marginRight: "5px",
                        }}>
                        {err}
                    </span>}
                    <div style={{marginTop: "25px"}}>
                        <span className='spanForm' onClick={handleClick}>Don't have an account? Sign Up</span>
                        <button className='button infoButton' type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login