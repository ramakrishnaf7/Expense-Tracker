import React,{useEffect, useState} from 'react'
import {Form,Input , message} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Layouts/Spinner';

const Register = () => {
    const navigate = useNavigate();
    const [load,setLoad] = useState(false);
    const submitHandler = async (values) => {
        try{
            setLoad(true)
            await axios.post('/users/register',values)
            message.success('Registration success')
            setLoad(false)
            navigate('/login')
        }catch(error){
            setLoad(false)
            message.error('invalid username or password')
        }
    }
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
                Register Form
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
                <Link to = '/login'>ALready register ? click here to login</Link>
                <button className='btn btn-primary'>Register</button>
            </div>
        </Form>
    </div>
  )
}

export default Register