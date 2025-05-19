// material-ui
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// third-party

// project-imports

// types

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

export default function Login({userName, setUserName, password, setPassword, handleLogin}) {
  return (
    <Grid
      container
      spacing={3}
      alignItems={"center"}
      justifyContent={"center"}      
      height={"100%"}
      marginTop={"10%"}
    >
      <Box
        sx={{ boxShadow: 3 }}
        padding={"40px"}
        borderRadius={"10px"}
        width={"500px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <h1 style={{textAlign: "center"}}>Admin Login</h1>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="Enter email address"
                value={userName.value}
                onChange={(e) => {
                  e.preventDefault();
                  setUserName({value: e.target.value, error: ""})
                }}
                error={userName.error}
                helperText={userName.error ? userName.errorMessage : ""}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} paddingTop={"30px"}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email">Password</InputLabel>
              <TextField
                fullWidth
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={password.value}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword({value: e.target.value, error: ""})}}
                error={password.error}
                helperText={password.error ? password.errorMessage : ""}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} paddingTop={"50px"}>
            <Stack direction="row" justifyContent="flex-end">
              <Button variant="contained" type="submit" onClick={handleLogin}>
                Verify & Submit
              </Button>
            </Stack>
          </Grid>
      </Box>
    </Grid>
  );
}
