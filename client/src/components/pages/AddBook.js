import { Grid, Button, Box,TextField, Stack, Input, IconButton, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const AddBook = () => {
    const navigate = useNavigate()
    const [bookImage, setBookImage] = useState([])
    const [previewImgUrl, setPreviewImgUrl] = useState("")
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState({
      status: false,
      msg: "",
      type: ""
    });

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const bodyObject = {
        "book_title": data.get("title"),
        "auther_name": data.get("auther"),
        "book_description": data.get("description"),
        "book_catogory": data.get("catogory"),
        "book_price": data.get("price"),
        "book_image": bookImage,
      }

      const formData =  new FormData()
      formData.append("title", bodyObject.book_title)
      formData.append("auther", bodyObject.auther_name)
      formData.append("description", bodyObject.book_description)
      formData.append("catogory", bodyObject.book_catogory)
      formData.append("price", bodyObject.book_price)
      formData.append("image", bodyObject.book_image)

      try {
        const responseObj = await axios.post("http://localhost:8000/api/book/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "token": localStorage.getItem("token")
          },
          onUploadProgress : data => {
            //Set the progress value to show the progress bar
            setProgress(Math.round((100 * data.loaded) / data.total))
          },
        })

        console.log("first", responseObj, progress)
        setError({ status: true, msg: responseObj.data.message, type: responseObj.data.type })
      } catch (error) {
          console.log(error)
      }
    }

    const handleImageUpload = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        setBookImage(file);
        setPreviewImgUrl(URL.createObjectURL(file));
      }
    }

    const handleDeleteImg = () => {
      setPreviewImgUrl("")
      setBookImage([])
    }
  return <>
    <Grid container justifyContent='center'>
      <Grid item sm={10}>
        <div style={{ display : "flex", justifyContent: "space-between", alignItems: "center"}}>
          <h1>Add Book Details</h1>
          <Button variant="outlined" style={{ height : 40}} onClick={() => navigate("/")}>Back</Button>
        </div>
        <hr />
        <div>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <Box style={{ display : "flex", gap : 50}}>
              <p>Book Image*</p>
              <Stack
                margin="normal"
                direction={"row"}
                alignItems={"center"}
                spacing={4}
              >
                {previewImgUrl === "" && (
                  <label htmlFor="profile-photo">
                    <Input
                      accept="image/*"
                      id="profile-photo"
                      type="file"
                      disabled={previewImgUrl !== ""}
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />

                    <Button variant="contained" component="span">
                      Upload Photo
                    </Button>
                  </label>
                )}

                {previewImgUrl !== "" && (
                  <Box style={{ position : "relative"}}>
                    <img src={previewImgUrl} height={200} width={200} style={{ borderRadius: "16px" }} alt="previewImage" />
                    <IconButton onClick={handleDeleteImg} style={{ position: "absolute", right: 10, top: 10, background: "white"}}>
                      <CloseIcon style={{ height: 20, width: 20 }} />
                    </IconButton>
                  </Box>
                )}

              </Stack>
            </Box>


            
            <TextField fullWidth margin="normal" required name="title" label="Book Title"  />
            <TextField fullWidth margin="normal" required name="auther" label="Auther Name" />
            <TextField fullWidth margin="normal" required name="description" label="Book Description"  />
            <TextField fullWidth margin="normal" required name="catogory" label="Catogory" />
            <TextField fullWidth margin="normal" required name="price" label="Book Price"  />
            <Box>
              <Button type="submit" color="primary" variant="contained" sx={{ mt: 3, mb: 2, px: 3 }}> Add </Button>
            </Box>

             {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
            
          </Box>
        </div>
      </Grid>
    </Grid>
  </>;
};

export default AddBook;
