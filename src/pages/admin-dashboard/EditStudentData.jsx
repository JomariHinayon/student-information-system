import { Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  FormLabel,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  Autocomplete,
  Button,
  Collapse,
  Alert,
  IconButton
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useLocation } from "react-router-dom";
import { async } from "@firebase/util";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditIcon from "@mui/icons-material/Edit";
import firebase from "firebase/compat/app";
import CloseIcon from "@mui/icons-material/Close";


const EditStudentData = () => {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState([]);
  const { state } = useLocation();
  const fname = useRef();
  const mname = useRef();
  const lname = useRef();
  const email = useRef();
  const password = useRef();
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [course, setCourse] = useState();
  const [bday, setBday] = React.useState(dayjs("2023-02-15T21:11:54"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [open, setOpen] = React.useState(true);
  const coursesAvailable = [
    "Bachelor of Science in Computer Science",
    "Bachelor of Science in Computer Engineering",
    "Bachelor of Science in Information Technology",
  ];

  // getting student data
  useEffect(() => {
    const getStudentData = async () => {
      setStudentId(state.studentId);

      try {
        const docRef = doc(db, "students", studentId);
        const docSnap = await getDoc(docRef);
        // console.log({...docSnap.data(), id: docSnap.id})
        setStudentData({ ...docSnap.data(), id: docSnap.id });
      } catch (error) {
        // console.log(error)
        console.log("getting the students data...!");
      }
    };

    getStudentData();
  }, [studentId]);

  // setting student data into the text fields
  useEffect(() => {
    const setFieldsData = () => {
      try {
        // convert firebase timestamp date to readable date
        const fireBaseTime = new Date(
          studentData.birthday.seconds * 1000 +
            studentData.birthday.nanoseconds / 1000000
        );
        const date = fireBaseTime.toDateString();
        setBday(date);
      } catch (error) {
        // console.log(error);
        console.log("getting birthday...");
      }

      // console.log(studentData);
      fname.current.value = studentData.firstname;
      lname.current.value = studentData.lastname;
      mname.current.value = studentData.middlename;
      email.current.value = studentData.email;
      password.current.value = studentData.password;
      setCourse(studentData.course);

      // check gender
      if (studentData.gender === "male") {
        setMale(true);
      } else if (studentData.gender === "female") {
        setFemale(true);
      }
    };

    setFieldsData();
  }, [studentData]);

  // set new birthday value
  const handleNewBirthday = (newValue) => {
    setBday(newValue);
  };

  // update is clicked
  const handleUpdate = async (e) => {
    e.preventDefault();

    // convert date to firebase timestamp
    const ConvertedDate = () => {
      const bdayTimestamp = firebase.firestore.Timestamp.fromDate(
        new Date(bday)
      ).toDate();

      return bdayTimestamp;
    };
   
  
    console.log(male)
    const updatedData = {
      firstname: fname.current.value,
      middlename: mname.current.value,
      lastname: lname.current.value,
      email: email.current.value,
      password: password.current.value,
      birthday: ConvertedDate(),
      gender: male ? "male" : "female",
      course: course,
    };

    try {
      setError("")
      setLoading(true);
      const userDoc = doc(db, "students", studentId);
      await updateDoc(userDoc, updatedData);
      setSuccessUpdate(true)
    } catch (error) {
      setError("Failed to update student data")
    }
    setLoading(false);
  };

  return (
    <Box display="flex" height={500}>
      <Box
        component="form"
        m="auto"
        p={1}
        textAlign="center"
        padding={5}
        width={950}
        onSubmit={handleUpdate}
      >
        {error && (
          <Collapse in={open}>
            <Alert
              severity="error"
              // action={
              //   <IconButton
              //     aria-label="close"
              //     color="inherit"
              //     size="small"
              //     onClick={() => {
              //       setOpen(false);
              //     }}
              //   >
              //     <CloseIcon fontSize="inherit" />
              //   </IconButton>
              // }
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          </Collapse>
        )}
        {/* Display Alert Success */}
        {successUpdate && (
          <Collapse in={open}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Student data successfully updated
            </Alert>
          </Collapse>
        )}
        <Stack gap={2}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            inputRef={fname}
            required
          />
          <TextField
            id="outlined-basic"
            label="Middle Name"
            variant="outlined"
            inputRef={mname}
            required
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            inputRef={lname}
            required
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            inputRef={email}
            required
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            inputRef={password}
            required
          />
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Birthday"
                inputFormat="MM/DD/YYYY"
                required
                value={bday}
                onChange={handleNewBirthday}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  checked={female}
                  onClick={() => {setFemale(true); setMale(false); }}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  checked={male}
                  onClick={() => {setFemale(false); setMale(true)}}
                />
              </RadioGroup>
            </FormControl>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={coursesAvailable}
              value={course ?? coursesAvailable[0]}
              onChange={(event, value) => setCourse(value)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Course" />}
            />
          </Stack>

          <Button
            disabled={loading}
            type="submit "
            variant="contained"
            endIcon={<EditIcon />}
          >
            Update
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default EditStudentData;
