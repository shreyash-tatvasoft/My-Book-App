import { TextField, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
const UserLogin = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user/login', actualData, {
        headers: {
          "Content-Type" : "application/json"
        }
      })
      setError({ status: true, msg: response.data.message, type: response.data.type })

      if(response.data.token) {
        document.getElementById('login-form').reset()
        localStorage.setItem("token", response.data.token)
          setTimeout(() =>{
            navigate('/dashboard')
          },1000)
      }
    } catch (error) {
      console.log(error)
      setError({ status: true, msg: "Something went wrong. Please try again later", type: 'error' })
    }

  }
  return <>
    <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>
      </Box>
      <NavLink to='/sendpasswordresetemail' >Forgot Password ?</NavLink>
      {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
    </Box>
  </>;
};

export default UserLogin;
