import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useAuth } from "../../context/AuthContext";
import { async } from "@firebase/util";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
// import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const RegisterStudent = () => {
  const firstnameRef = React.useRef();
  const middlenameRef = React.useRef();
  const lastnameRef = React.useRef();
  const birthdayRef = React.useRef();
  const genderRef = React.useRef();
  const studentNumberRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  const [course, setCourse] = React.useState()
  const [value, setValue] = React.useState(dayjs("2023-02-15T21:11:54"));
  const { registerStudent } = useAuth();
  const [error, setError] = React.useState(""); // set the errors
  const [loading, setLoading] = React.useState(false); // loading animation in clicking submit to prevent multiple submits
  const [open, setOpen] = React.useState(true);
  const [successRegister, setSuccessRegister] = React.useState(false);
  const usersCollectionRef = collection(db, "students");
  const [emptyFields, setEmptyFields] = React.useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
    setError("");
  };

  // Submit is clicked
  // const handleRegister = async (e) => {
  //   e.preventDefault();

  //   // check if password and confirm password are the same
  //   if (passwordRef.current.value !== confirmPasswordRef.current.value) {
  //     return setError("Password do not match");
  //   }

  //   try {
  //     setError("");
  //     setLoading(true);
  //     await registerStudent(emailRef.current.value, passwordRef.current.value);
  //     setSuccessRegister(true);
  //   } catch {
  //     setError("Failed to register the student");
  //   }
  //   setLoading(false);
  // };

  const coursesAvailable = [
    "Bachelor of Science in Computer Science",
    "Bachelor of Science in Computer Engineering",
    "Bachelor of Science in Information Technology"
  ]

  // convert date to firebase timestamp
  function ConvertedDate() {
    const bdayTimestamp = firebase.firestore.Timestamp.fromDate(
      new Date(birthdayRef.current.value)
    ).toDate();

    return bdayTimestamp;
  }

  // register button is clicked
  const handleRegister = async (e) => {
    e.preventDefault();


    const fieldsValue = {
      firstname: firstnameRef.current.value,
      middlename: middlenameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      birthday: ConvertedDate(),
      gender: genderRef.current.value,
      student_number: studentNumberRef.current.value,
      password: passwordRef.current.value,
      course: course
    };

    // check if password and confirm password are the same
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Password do not match");
    }

    try {
      setError("");
      setLoading(true);
      await addDoc(usersCollectionRef, fieldsValue);
      setSuccessRegister(true);
    } catch {
      setError("Failed to register the student");
    }
    setLoading(false);
  };

  return (
    <>
      <Box display="flex" height={500}>
        {/* {currentUser && currentUser.email} */}
        {/* {console.log(currentUser)} */}
        <Box
          component="form"
          m="auto"
          p={1}
          textAlign="center"
          padding={5}
          width={950}
          onSubmit={handleRegister}
        >
          {/* Display Alert Error */}
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
          {successRegister && (
            <Collapse in={open}>
              <Alert
                severity="success"
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
                Student successfully register
              </Alert>
            </Collapse>
          )}
          <Typography
            variant="h4"
            component="p"
            color="#567189"
            alignSelf="start"
            paddingBottom={5}
          >
            Register Student
          </Typography>
          <Grid container rowSpacing={2}>
            <Grid xs={4}>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                type="text"
                sx={{ width: 300 }}
                inputRef={firstnameRef}
                required
              />
            </Grid>
            <Grid xs={4}>
              <TextField
                id="outlined-basic"
                label="Middle Name"
                variant="outlined"
                type="text"
                sx={{ width: 300 }}
                inputRef={lastnameRef}
                required
              />
            </Grid>
            <Grid xs={4}>
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                type="text"
                sx={{ width: 300 }}
                inputRef={middlenameRef}
              />
            </Grid>
            <Grid xs={5}>
              <TextField
                inputRef={emailRef}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                sx={{ width: 380 }}
                required
              />
            </Grid>
            <Grid xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  inputRef={birthdayRef}
                  label="Birthday"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                  required
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={3}>
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
                    inputRef={genderRef}
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    inputRef={genderRef}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid xs={4}>
              <TextField
                id="outlined-basic"
                label="Student Number"
                variant="outlined"
                type="number"
                sx={{ width: 300 }}
                inputRef={studentNumberRef}
                required
              />
            </Grid>
            <Grid xs={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={coursesAvailable}
                onChange={(event, value) => setCourse(value)}
                sx={{ width: 300 }}

                renderInput={(params) => (
                  <TextField {...params} label="Course" />
                )}
                required
              />
            </Grid>
            <Grid xs={4}>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                sx={{ width: 300 }}
                inputRef={passwordRef}
                required
              />
            </Grid>
            <Grid xs={4}>
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                type="password"
                sx={{ width: 300 }}
                inputRef={confirmPasswordRef}
                required
              />
            </Grid>
          </Grid>

          <Button
            disabled={loading}
            variant="contained"
            size="medium"
            sx={{ backgroundColor: "#7B8FA1", width: 200, marginTop: 5 }}
            type="submit"
          >
            Register
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RegisterStudent;
