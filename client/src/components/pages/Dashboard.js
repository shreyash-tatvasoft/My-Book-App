import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './auth/ChangePassword';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate()
  const [ userInfo, setuserInfo] = useState()
  const handleLogout = () => {
    console.log("Logout Clicked");
    localStorage.clear()
    navigate('/login')
  }

  const getuserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/userInfo", {
        headers : {
          token : localStorage.getItem("token")
        }
      })

      console.log(response.data)
      if(response.data.data) {
        setuserInfo(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getuserInfo()
  }, [])
  return <>
    <CssBaseline />
    <Grid container>
      <Grid item sm={6} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
        <h1>Dashboard</h1>
        <Typography variant='h5'>Email: {userInfo?.email}</Typography>
        <Typography variant='h6'>Name: {userInfo?.name}</Typography>
        <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
      </Grid>
      <Grid item sm={6}>
        <ChangePassword />
      </Grid>
    </Grid>
  </>;
};

export default Dashboard;
