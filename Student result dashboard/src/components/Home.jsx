import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";



const HomePage = () => {
  return (
    <>
     

      {/* Spacer to push content below fixed AppBar */}
      

      <Box sx={{ p: 4 }}
           marginTop={"80px"}
           
          
      >
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Image Left */}
            <Grid item xs={12} md={4}>
              <img
                src="https://schoolarchitects.in/wp-content/uploads/2023/05/MIS_FRONT-768x512.png"
                alt="Knowledge Brains"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Grid>

            {/* Text Right */}
            <Grid item xs={12} md={8} marginLeft={"10px"}>
              <Typography variant="h4" gutterBottom display={"flex"} justifyContent={"center"}>
                Welcome to<b> Knowledge Brains</b>
              </Typography>
              <Typography variant="body1">
                Empowering students with knowledge and insight. Let’s grow and
                learn together!
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default HomePage;
