import React,{useState,useEffect} from 'react';
import {Form,Input,message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Layouts/Spinner';


const Loginpage = () => {
    const navigate = useNavigate();
    const [load,setLoad] = useState(false);
    const submitHandler = async (values) => {
        try{
            setLoad(true)
            const {data} = await axios.post('/users/login',values)
            message.success('Login successful')
            localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
            setLoad(false)
            navigate('/')

        }catch(error){
            setLoad(false)
            message.error('something went wrong')
        }
    };
    //prevent for login user
    useEffect(() =>{
        if(localStorage.getItem('user')){
            navigate('/')
        }
    },[navigate]);
  return (
    <div className='register-page'>
        {load && <Spinner />}
        <Form layout='vertical' onFinish={submitHandler}>
            <h1>
                Login Form
            </h1>
            <Form.Item label = 'Name' name='name'>
                <Input />
            </Form.Item>
            <Form.Item label = 'Email' name='email'>
                <Input type='email'/>
            </Form.Item>
            <Form.Item label = 'Password' name='password'>
                <Input type='password'/>
            </Form.Item>
            <div className = 'd-flex justify-content-between '>
                <Link to = '/register'>Not a user? click here to register</Link>
                <button className='btn btn-primary'>Login</button>
            </div>
        </Form>
    </div>
  )
}

export default Loginpage