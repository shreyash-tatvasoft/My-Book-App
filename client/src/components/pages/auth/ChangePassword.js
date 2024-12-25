import { Box, TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
  const navigate = useNavigate()
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      password: data.get('password'),
      confirm_password: data.get('password_confirmation'),
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user/changeUserPassword', actualData, {
        headers: {
          "Content-Type" : "application/json",
          "token": localStorage.getItem("token")
        }
      })
      setError({ status: true, msg: response.data.message, type: response.data.type })

      if(response.data.type === "success") {
        document.getElementById("password-change-form").reset();
        setTimeout(() => {
          setError({ status: false, msg: response.data.message, type: response.data.type })
          navigate("/login")
        },1500)
      }
    } catch (error) {
      console.log(error)
      setError({ status: true, msg: "Something went wrong. Please try again later", type: 'error' })
    }

  };
  return <>
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
      <h1>Change Password</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id="password-change-form">
        <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" />
        <TextField margin="normal" required fullWidth name="password_confirmation" label="Confirm New Password" type="password" id="password_confirmation" />
        <Box textAlign='center'>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}> Update </Button>
        </Box>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </Box>
  </>;
};

export default ChangePassword;
