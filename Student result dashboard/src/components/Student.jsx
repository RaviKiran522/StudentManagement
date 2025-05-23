import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Container, Pagination } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import AddStudent from "./AddStudent";
import AddMarks from "./AddMarks";
const Student = ({
  students,
  handledelete,
  isMarksManagement = false,
  studentsData,
  setStudentsData,
  filteredStudents,
  setFilteredStudents,
  calledFromMarksManagement,
}) => {
  const [openEdit, setOpenEdit] = useState({
    flag: false,
    student: null,
  });
  const [openMarks, setOpenMarks] = useState({
    flag: false,
    student: null,
    type: "",
  });
  const [openDelete, setOpenDelete] = useState();
  const handleedit = (student) => {
    setOpenEdit({ flag: true, student: student });
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenEdit({ flag: false, student: null });
    }
  };

  const closeMarksHandler = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenMarks({ flag: false, student: null, type: "" });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(students.length / itemsPerPage);

  const handlePageChange = (event, value) => {
  setCurrentPage(value);
};

const paginatedStudents = students.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

  return (
    <>
      {paginatedStudents?.length > 0 &&
        paginatedStudents.map((student) => (
          <Box
            sx={{ boxShadow: "3" }}
            padding={"30px"}
            borderRadius={"10px"}
            justifyContent={"center"}
            margin={"30px"}
            alignItems={"center"}
            width={"auto"}
          >
            <Grid
              container
              justifyContent={"space-around"}
              spacing={30}
              alignItems={"center"}
              direction={"row"}
            >
              <Grid item xs={2}>
                <img
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
                  alt="avathar"
                  style={{ width: "100px", height: "100px" }}
                />
              </Grid>
              <Grid item xs={3}>
                <p>
                  <b>Name:</b> {student.nam}
                </p>
                <p>
                  <b>Roll No:</b> {student.rollNo}
                </p>
                <p>
                  <b>Class:</b> {student.clas}
                </p>
                <p>
                  <b>Class Teacher:</b> {student.classTeacher}
                </p>
              </Grid>
              {!calledFromMarksManagement && (
                <Grid item xs={3}>
                  <p>
                    <b>Father Name:</b> {student.fatherName}
                  </p>
                  <p>
                    <b>Address:</b> {student.adds}
                  </p>
                  <p>
                    <b>Mobile Number:</b> {student.mobileNumber}
                  </p>
                </Grid>
              )}
              {calledFromMarksManagement ? (
                <Grid item xs={2}>
                  <Grid container direction={"column"} spacing={1}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpenMarks({
                          flag: true,
                          type: "Add",
                          student: student,
                        });
                      }}
                    >
                      Add Marks
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpenMarks({
                          flag: true,
                          type: "View",
                          student: student,
                        });
                      }}
                    >
                      View Marks
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpenMarks({
                          flag: true,
                          type: "Edit",
                          student: student,
                        });
                      }}
                    >
                      Edit Marks
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  justifyContent={"space-around"}
                  spacing={5}
                  alignItems={"center"}
                  direction={"column"}
                >
                  <EditIcon onClick={() => handleedit(student)} />
                  <DeleteIcon onClick={() => handledelete(student.rollNo)} />
                </Grid>
              )}
            </Grid>
          </Box>
        ))}

      {openMarks.flag && (
        <AddMarks
          open={openMarks.flag}
          from={openMarks.type}
          student={openMarks.student}
          handleClose={closeMarksHandler}
        />
      )}
      {openEdit.flag && (
        <AddStudent
          from={"Edit"}
          open={openEdit.flag}
          student={openEdit.student}
          handleClose={handleClose}
          filteredStudents={filteredStudents}
          setFilteredStudents={setFilteredStudents}
          studentsData={studentsData}
          setStudentsData={setStudentsData}
        />
      )}
      <Box sx={{display:"flex" ,justifyContent:"flex-end", paddingRight:"20px"}}>
        <Pagination count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary" />
      </Box>
    </>
    
  );
};

export default Student;
