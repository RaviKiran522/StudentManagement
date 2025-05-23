import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Student from "./Student";
import axios from "axios";

function MarksManagement() {
  const [searchFilter, setSearchFilter] = useState({
    selectstudentclass: "",
    studentrollno: "",
  });
  const [studentsData, setStudentsData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const handleChange = (event) => {
    if (event.target.name === "selectstudentclass") {
      setSearchFilter({
        ...searchFilter,
        selectstudentclass: event.target.value,
      });
    } else if (event.target.name === "studentrollno") {
      setSearchFilter({ ...searchFilter, studentrollno: event.target.value });
    }
    // setSearchFilter((filter)=>{
    //   return {...filter, [name]: value};
    // })
  };

   const getStudentsData = async () => {
    const response = await axios.get("https://localhost:7135/api/Students");
    if (response.data.length > 0) {
      setStudentsData(response.data);
      setFilteredStudents(response.data);
    } else {
      setStudentsData([]);
      setFilteredStudents([]);
    }
  };

  useEffect(() => {
    getStudentsData();
  }, []);

const handleSearch = () => {
  console.log("searchFilter: ", searchFilter);

  if (
    searchFilter.selectstudentclass !== "" &&
    searchFilter.studentrollno !== ""
  ) {
    const result = studentsData.filter(
      (student) =>
        student.clas == searchFilter.selectstudentclass &&
        student.rollNo.toLowerCase() ===
          searchFilter.studentrollno.toLowerCase()
    );
    
    setFilteredStudents(result);
  }
};


  console.log(filteredStudents);

  console.log("checking called........");
  return (
    <Box
      sx={{ boxShadow: "3" }}
      padding={"10px"}
      borderRadius={"10px"}
      justifyContent={"center"}
      marginTop={"130px"}
      marginLeft={"30px"}
      marginRight={"30px"}
      alignItems={"center"}
      width={"100%"}
    >
      <h1 style={{ textAlign: "center" }}>Marks Management</h1>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={"20px"}
        marginLeft={"20px"}
        marginRight={"20px"}
        sx={{ mt: "30px", boxShadow: 4, borderRadius: "10px" }}
      >
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          paddingRight={"130px"}
        >
          <TextField
            id="outlined-basic"
            label="Search student id"
            variant="outlined"
            name="studentrollno"
            value={searchFilter?.studentrollno}
            sx={{ paddingRight: "40px" }}
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name={"selectstudentclass"}
              value={searchFilter?.selectstudentclass}
              label="Class"
              onChange={handleChange}
              width="120px"
            >
              <MenuItem value={1}>I class</MenuItem>
              <MenuItem value={2}>II class</MenuItem>
              <MenuItem value={3}>III class</MenuItem>
              <MenuItem value={4}>IV class</MenuItem>
              <MenuItem value={5}>V class</MenuItem>
              <MenuItem value={6}>VI class</MenuItem>
              <MenuItem value={7}>VII class</MenuItem>
              <MenuItem value={8}>VIII class</MenuItem>
              <MenuItem value={9}>IX class</MenuItem>
              <MenuItem value={10}>X class</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => setFilteredStudents(studentsData)}
          >
            Clear Filter
          </Button>
        </Box>
      </Box>
      <Student students={filteredStudents} calledFromMarksManagement={true}/>
    </Box>
  );
}
export default MarksManagement;
