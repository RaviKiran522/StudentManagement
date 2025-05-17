import React, { useState } from 'react';
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Modal, Typography } from '@mui/material';

function StudentCard(){
      const [open, setOpen] = useState(false);

  // Function to handle opening the modal
  const handleOpen = () => setOpen(true);

  // Function to handle closing the modal
  const handleClose = () => setOpen(false);

    return(
        
          <Box sx={{ boxShadow: 3 }}
               padding={"40px"}
               borderRadius={"10px"}
               justifyContent={"center"}
               margin={"50px"}
               alignItems={"center"}> 
            <Grid container direction={"row"} spacing={30} alignItems={"center"}> 
                <Grid>
                    <img
                      src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
                      alt="avathar"
                      style={{ width: "100px", height: "100px" }}
                    />

                </Grid>
                <Grid>
                    <p>Name:</p>
                    <p>Roll No:</p>
                    <p>Class Teacher:</p>
                </Grid>
                <Grid>
                    <p>Father Name:</p>
                    <p>Address:</p>
                    <p>Mobile Number:</p>
                </Grid>
                <Grid>
                    <Button variant="contained" onClick={handleOpen}>View details</Button>
                </Grid>
            </Grid>    

            <Modal
        open={open} // modal visibility
        onClose={handleClose} // close the modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
         <Grid container
               justifyContent="center"
               alignItems="center">  
          <Grid >
            <p>Name</p>
            <p>Class</p>
            <p>Section</p>
          </Grid>
          <Grid container direction={"row"} spacing={20} alignItems={"center"} sx={{ml:5}}>
            <Grid>
                <p>Telugu</p>
                <p>Hindi</p>
                <p>English</p>
            </Grid>
            <Grid>
                <p>Maths</p>
                <p>Science</p>
                <p>Social</p>
            </Grid>
            <Grid>Total</Grid>
          </Grid>
          <Grid>
            <Button onClick={handleClose} sx={{ mt: 2 }} variant="outlined">
                Close
            </Button>
        </Grid>
         </Grid> 
        </Box>
      </Modal>

          </Box>
        
    );
}

export default StudentCard;