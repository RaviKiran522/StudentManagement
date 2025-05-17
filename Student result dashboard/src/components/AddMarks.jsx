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
import {Alert} from "@mui/material";
export default function AddMarks({
  from = "Add",
  open,
  student,
  handleClose,
  studentsData,
  setStudentsData,
  filteredStudents,
  setFilteredStudents,
}) {
  const initialMarks = {
    telugu: "",
    hindi: "",
    english: "",
    maths: "",
    science: "",
    social: "",
    class: student.class,
    rollNo: student.rollNo,
  };
  const marksDataFromStorage = localStorage.getItem("marks");
  const marks = marksDataFromStorage ? JSON.parse(marksDataFromStorage) : [];

  const filterdMarks = marks.find((std) => std.RollNo === student.RollNo);
  console.log("from: ", from, "filterdMarks: ", filterdMarks);
  const [formData, setFormData] = useState(
    from === "Add" ? initialMarks : filterdMarks
  );
  const [showAlert, setShowAlert] = useState(false);
  const [totalMarks, setTotalMarks] = useState("");
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log("formData: ", formData);
  const handleAddOrEditMarks = () => {
    if (from === "Add") {
      const findstudent = marks.find(
        (stuma) => stuma.RollNo === student.RollNo
      );
      if (findstudent) {
        setShowAlert(true);
        return;
      } else {
        const updatedMarks = [...marks, formData];
        localStorage.setItem("marks", JSON.stringify(updatedMarks));
        handleClose();
      }
    } else {
      const updatedMarks = marks.map((student) => {
        if (student.RollNo === formData.RollNo) {
          return { ...student, ...formData };
        } else {
          return student;
        }
      });
      localStorage.setItem("marks", JSON.stringify(updatedMarks));
      handleClose();
    }
  };

  console.log("formData: ", formData);
  useEffect(() => {
    let total = 0;
    for (let i in formData) {
      if (i !== "class" && i !== "rollNo") {
        total += parseInt(formData[i]);
      }
    }
    setTotalMarks(total);
  }, [formData]);
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
              <h3>
                {from === "Add"
                  ? "Add Marks"
                  : from === "View"
                  ? "View Marks"
                  : "Edit Makrs"}
              </h3>
            </Grid>

            <Grid>
              <CloseIcon onClick={handleClose} />
            </Grid>
          </Grid>
          <hr />
          {showAlert && (
            <Alert severity={"warning"}>
              You have already added marks, please edit them if you want to
              change
            </Alert>
          )}
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
                  name={"class"}
                  value={formData.class}
                  label="Class"
                  onChange={handleOnChange}
                  width="250px"
                  disabled={true}
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
                  label="student RollNo"
                  variant="outlined"
                  name="RollNo"
                  width="250px"
                  disabled={true}
                  value={formData.rollNo}
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
                  label="Telugu"
                  variant="outlined"
                  name="telugu"
                  width="250px"
                  value={formData.telugu}
                  onChange={handleOnChange}
                  disabled={from === "View" ? true : false}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Hindi"
                  variant="outlined"
                  name="hindi"
                  width="250px"
                  value={formData.hindi}
                  onChange={handleOnChange}
                  disabled={from === "View" ? true : false}
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
                  label="English"
                  variant="outlined"
                  name="english"
                  width="250px"
                  value={formData.english}
                  onChange={handleOnChange}
                  disabled={from === "View" ? true : false}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Maths"
                  variant="outlined"
                  name="maths"
                  width="250px"
                  value={formData.maths}
                  onChange={handleOnChange}
                  disabled={from === "View" ? true : false}
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
                  label="Social"
                  variant="outlined"
                  name="social"
                  width="250px"
                  value={formData.social}
                  onChange={handleOnChange}
                  disabled={from === "View" ? true : false}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Science"
                  variant="outlined"
                  name="science"
                  width="250px"
                  value={formData.science}
                  onChange={handleOnChange}
                  disabled={from === "View" ? true : false}
                />
              </FormControl>
            </Grid>
          </Box>

          {from === "View" && (
            <Box
              display={"flex"}
              justifyContent={"center"}
              marginTop={"10px"}
              boxShadow={"1"}
              padding={"10px"}
              borderRadius={"10px"}
            >
              Total Marks : {totalMarks}
            </Box>
          )}
          {from !== "View" && (
            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Button variant={"contained"} onClick={handleAddOrEditMarks}>
                {from === "Add" ? "Save Marks" : "Update Marks"}
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
