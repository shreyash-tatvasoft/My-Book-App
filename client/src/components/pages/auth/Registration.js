import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
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
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      confirm_password: data.get('password_confirmation'),
      tc: data.get('tc') === "agree" ? true : false,
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user/register', actualData, {
        headers: {
          "Content-Type" : "application/json"
        }
      })
      setError({ status: true, msg: response.data.message, type: response.data.type })

      if(response.data.token) {
        document.getElementById('registration-form').reset()
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
    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <TextField margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm Password' type='password' />
      <FormControlLabel control={<Checkbox value="agree" color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
      </Box>
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
    </Box>
  </>;
};

export default Registration;
