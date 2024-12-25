import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SendPasswordResetEmail = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user/forgotPassword', actualData, {
        headers: {
          "Content-Type" : "application/json"
        }
      })
      setError({ status: true, msg: response.data.message, type: response.data.type })

      if(response.data.id) {
      document.getElementById('password-reset-email-form').reset()
          setTimeout(() =>{
            navigate(`/reset/${response.data.id}`)
          },3000)
      }
    } catch (error) {
      console.log(error)
      setError({ status: true, msg: "Something went wrong. Please try again later", type: 'error' })
    }
  }
  return <>
    <Grid container justifyContent='center'>
      <Grid item sm={6} xs={12}>
        <h1>Reset Password</h1>
        <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-email-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Send</Button>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
      </Grid>
    </Grid>
  </>;
};

export default SendPasswordResetEmail;
