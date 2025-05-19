import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import StudentCard from "./components/StudentCard";
import StudentManagement from "./components/StudentManagement";
import { Grid } from "@mui/material";
import MarksManagement from "./components/MarksManagement";
import HomePage from "./components/Home";

function App() {
  const [userName, setUserName] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const status = localStorage.getItem("loggedIn") === "true" ? true : false;
  const [showHomePage, setShowHomePage] = useState(
    status
  );
  const handleLogin = () => {
    let isValid = true;
    if (userName.value === "") {
      isValid = false;
      setUserName({
        ...userName,
        error: true,
        errorMessage: "Please enter email",
      });
    } else if (userName.value !== "") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(userName.value)) {
        setUserName({
          ...userName,
          error: true,
          errorMessage: "Please enter valid email",
        });
      }
    }
    if (password.value === "") {
      isValid = false;
      setPassword({
        ...password,
        error: true,
        errorMessage: "Please enter password",
      });
    }
    if (isValid) {
      setShowHomePage(true);
      localStorage.setItem("loggedIn", "true");
    }
  };
  console.log("userName: ", userName);
  return (
    <Grid container justifyContent={"center"}>
      {!showHomePage ? (
        <Login
          userName={userName}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <></>
      )}

      {/* <StudentCard/> */}
      {showHomePage && (
        <BrowserRouter>
          <Navbar setShowHomePage={setShowHomePage} />
          <Routes sx={{mt: "172px" }}>

            <Route path="/" element={<HomePage/>} />
            <Route path="/studentmanagement" element={<StudentManagement />} />
            <Route path="/marksmanagement" element={<MarksManagement />} />
            
          </Routes>
        </BrowserRouter>
      )}
    </Grid>
  );
}

export default App;
