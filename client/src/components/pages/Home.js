import { Grid, Button, Card, CardMedia, CardContent, Typography, Chip, styled , Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate()
  const [bookData, setBookData] = useState([])

  const getBookData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/book/list")

      if(response.data.data) {
        setBookData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBookData()
  }, [])


  return <>
    <Grid container justifyContent='center'>
      <Grid item sm={10}>
        <div style={{ display : "flex", justifyContent: "space-between", alignItems: "center"}}>
          <h1>Book Listing Page</h1>
          <Button variant="contained" style={{ height : 40}} onClick={() => navigate('/addBook')}>Add</Button>
        </div>
        <hr />

        <Grid container spacing={3}>

          {bookData.length > 0 ? bookData.map((item, index) =>
            <Grid item md={4} key={index}>
              <StyledCard>
                <StyledMedia component="img" image={`http://localhost:8000/${item.book_image}`} alt={`title-${index}`} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.book_title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.book_description}
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary" style={{ marginTop: 8 }}>
                    Auther: {item.auther_name}
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary" style={{ marginTop: 8 }}>
                    Price: {item.book_price}
                  </Typography>
                  <StyledChip label={item.book_catogory} color="error" />
                </CardContent>
              </StyledCard>
            </Grid>
          ) : 
          
            <Grid item md={12}>
                <Box textAlign={"center"}>
                No data
                </Box>
            </Grid>  
           
          }

        </Grid>
        

        
      </Grid>
    </Grid>
  </>;
};

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "auto",
}));

const StyledMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));



export default Home;
