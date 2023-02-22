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
  IconButton,
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
import { subjectsAvailable } from "../../data/data";

const EditTeacherData = () => {
  const [teacherId, setTeacherId] = useState("");
  const [teacherData, setTeacherData] = useState([]);
  const { state } = useLocation();
  const fname = useRef();
  const mname = useRef();
  const lname = useRef();
  const email = useRef();
  const password = useRef();
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [handledSubject, setHandledSubject] = useState();
  const [bday, setBday] = React.useState(dayjs("2023-02-15T21:11:54"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [open, setOpen] = React.useState(true);

  // getting teacher data
  useEffect(() => {
    const getTeacherData = async () => {
      setTeacherId(state.teacherId);

      try {
        const docRef = doc(db, "teachers", teacherId);
        const docSnap = await getDoc(docRef);
        // console.log({...docSnap.data(), id: docSnap.id})
        setTeacherData({ ...docSnap.data(), id: docSnap.id });
      } catch (error) {
        // console.log(error)
        console.log("getting the teacher data...!");
      }
    };

    getTeacherData();
  }, [teacherId]);

  // setting teacher data into the text fields
  useEffect(() => {
    const setFieldsData = () => {
      try {
        // convert firebase timestamp date to readable date
        const fireBaseTime = new Date(
            teacherData.birthday.seconds * 1000 +
            teacherData.birthday.nanoseconds / 1000000
        );
        const date = fireBaseTime.toDateString();
        setBday(date);
      } catch (error) {
        // console.log(error);
        console.log("getting birthday...");
      }

      // console.log(teacherData);
      fname.current.value = teacherData.firstname;
      lname.current.value = teacherData.lastname;
      mname.current.value = teacherData.middlename;
      email.current.value = teacherData.email;
      password.current.value = teacherData.password;
      setHandledSubject(teacherData.handled_subject);

      // check gender
      if (teacherData.gender === "male") {
        setMale(true);
      } else if (teacherData.gender === "female") {
        setFemale(true);
      }
    };

    setFieldsData();
  }, [teacherData]);

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

    console.log(male);
    const updatedData = {
      firstname: fname.current.value,
      middlename: mname.current.value,
      lastname: lname.current.value,
      email: email.current.value,
      password: password.current.value,
      birthday: ConvertedDate(),
      gender: male ? "male" : "female",
      handled_subject: handledSubject,
    };

    try {
      setError("");
      setLoading(true);
      const userDoc = doc(db, "teachers", teacherId);
      await updateDoc(userDoc, updatedData);
      setSuccessUpdate(true);
    } catch (error) {
      setError("Failed to update teacher data");
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
              Teacher Profile successfully updated
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
                  onClick={() => {
                    setFemale(true);
                    setMale(false);
                  }}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  checked={male}
                  onClick={() => {
                    setFemale(false);
                    setMale(true);
                  }}
                />
              </RadioGroup>
            </FormControl>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={subjectsAvailable}
              value={handledSubject ?? subjectsAvailable[0]}
              onChange={(event, value) => setHandledSubject(value)}
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

export default EditTeacherData;
