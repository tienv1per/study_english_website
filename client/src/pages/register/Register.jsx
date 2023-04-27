import React, { useState } from 'react';
import "./register.css";
import Logo from "../../image/logo.webp";
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';

const Register = () => {
    const INITIAL_STATE = {
        username: "",
        password: "",
        confirmPass: "",
        firstname: "",
        lastname: "",
    }

    const [data, setData] = useState(INITIAL_STATE);
    const [err, setErr] = useState("");

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/login");
    }

    const handleChange = (e) => {
        e.preventDefault();
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if(data.password !== data.confirmPass) {
                setErr("Password does not match");
                return ;
            }
            const res = await Api.authApi.registerApi(data);
            if(!res.data.success) {
                setErr(res.data.message);
                return ;
            }
            navigate("/login");
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
                    <h1>Sign Up</h1>
                    <div>
                        <input 
                            placeholder='First Name' 
                            className='infoInput' 
                            name='firstname'
                            value={data.firstname}
                            onChange={handleChange}
                        />
                        <input 
                            placeholder='Last Name' 
                            className='infoInput' 
                            name='lastname'
                            value={data.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input 
                            className='infoInput'
                            placeholder='username'
                            name='username'
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input 
                            className='infoInput' 
                            placeholder='password' 
                            name='password'
                            type='password'
                            value={data.password}
                            onChange={handleChange}
                        />
                        <input 
                            className='infoInput' 
                            placeholder='confirm password' 
                            name='confirmPass'
                            type='password'
                            value={data.confirmPass}
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
                    <div>
                        <span className='spanForm' onClick={handleClick}>Already have an account? Login!</span>
                    </div>
                    <button className='button infoButton' type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register

