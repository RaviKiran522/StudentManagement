import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Modal, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function AddStudent({
  from = "Add",
  open,
  student,
  handleClose,
  studentsData,
  setStudentsData,
  filteredStudents,
  setFilteredStudents,
  getStudentsData,
}) {
  const initialValues = {
    id: "",
    nam: "",
    rollNo: "",
    clas: "",
    classTeacher: "",
    fatherName: "",
    adds: "",
    mobileNumber: "",
  };
  console.log("from: ", from);
  const [formData, setFormData] = useState(
    from === "Add" ? initialValues : student
  );
  console.log("student: ", student);
  console.log("formdata: ", formData);
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const postData = async (stuData) => {
    const requestBody = {
      id: String(studentsData.length + 1),
      nam: stuData?.nam,
      rollNo: stuData?.rollNo,
      clas: stuData?.clas ? String(stuData?.clas) : "",
      classTeacher: stuData?.classTeacher,
      fatherName: stuData?.fatherName,
      adds: stuData?.adds,
      mobileNumber: stuData?.mobileNumber,
    };
    await axios
      .post("https://localhost:7135/api/Students", requestBody)
      .then((response) => {
        console.log("Student added:", response.stuData);
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
    const response = await axios.get("https://localhost:7135/api/Students");
    if (response.data.length > 0) {
      setStudentsData(response.data);
      setFilteredStudents(response.data);
    } else {
      setStudentsData([]);
      setFilteredStudents([]);
    }
  };

  const updateStudent = async (stuData) => {
    const requestBody = {
      id: stuData?.id,
      nam: stuData?.nam,
      rollNo: stuData?.rollNo,
      clas: stuData?.clas ? String(stuData?.clas) : "",
      classTeacher: stuData?.classTeacher,
      fatherName: stuData?.fatherName,
      adds: stuData?.adds,
      mobileNumber: stuData?.mobileNumber,
    };

    const response = await axios.put(
      `https://localhost:7135/api/students/rollnumber/${student?.rollNo}`,
      requestBody
    );
    const response1 = await axios.get("https://localhost:7135/api/Students");
    if (response1.data.length > 0) {
      setStudentsData(response1.data);
      setFilteredStudents(response1.data);
    } else {
      setStudentsData([]);
      setFilteredStudents([]);
    }
  };

  const handleAddOrEditStudent = async () => {
    if (from === "Add") {
      postData(formData);
    } else {
      updateStudent(formData);
    }
    handleClose();
    setFormData(initialValues);
  };
  console.log("open", open);
  return (
    <Box container>
      <Modal
        open={open} // modal visibility
        onClose={handleClose} // close the modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            width: "50%",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid justifyContent={"space-between"} container direction={"row"}>
            <Grid>
              <h3>{from === "Add" ? "Add Student" : "Edit Student"}</h3>
            </Grid>

            <Grid>
              <CloseIcon onClick={() => handleClose()} />
            </Grid>
          </Grid>
          <hr />
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "45ch" } }}
            noValidate
            autoComplete="off"
            display={"flex"}
            justifyContent={"space-between"}
          >
            {" "}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name={"clas"}
                  value={formData.clas}
                  label="Class"
                  onChange={handleOnChange}
                  disabled={from === "Edit" ? true : false}
                  width="250px"
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
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="student id"
                  variant="outlined"
                  name="rollNo"
                  width="250px"
                  value={formData.rollNo}
                  disabled={from === "Edit" ? true : false}
                  onChange={handleOnChange}
                />
              </FormControl>
            </Grid>
          </Box>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "45ch" } }}
            noValidate
            autoComplete="off"
            display={"flex"}
            justifyContent={"space-between"}
          >
            {" "}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="student name"
                  variant="outlined"
                  name="nam"
                  width="250px"
                  value={formData.nam}
                  onChange={handleOnChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="student class teacher"
                  variant="outlined"
                  name="classTeacher"
                  width="250px"
                  value={formData.classTeacher}
                  onChange={handleOnChange}
                />
              </FormControl>
            </Grid>
          </Box>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "45ch" } }}
            noValidate
            autoComplete="off"
            display={"flex"}
            justifyContent={"space-between"}
          >
            {" "}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="student father name"
                  variant="outlined"
                  name="fatherName"
                  width="250px"
                  value={formData.fatherName}
                  onChange={handleOnChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="student address"
                  variant="outlined"
                  name="adds"
                  width="250px"
                  value={formData.adds}
                  onChange={handleOnChange}
                />
              </FormControl>
            </Grid>
          </Box>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "45ch" } }}
            noValidate
            autoComplete="off"
            display={"flex"}
            justifyContent={"space-between"}
          >
            {" "}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="student mobile number"
                  variant="outlined"
                  name="mobileNumber"
                  width="250px"
                  value={formData.mobileNumber}
                  onChange={handleOnChange}
                />
              </FormControl>
            </Grid>
          </Box>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <Button variant={"contained"} onClick={handleAddOrEditStudent}>
              {from === "Add" ? "Save Details" : "Update Details"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
