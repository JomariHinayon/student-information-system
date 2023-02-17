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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useAuth } from "../context/AuthContext";
import { async } from "@firebase/util";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

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
  const [value, setValue] = React.useState(dayjs("2023-02-15T21:11:54"));
  const { registerStudent } = useAuth();
  const [error, setError] = React.useState(""); // set the errors
  const [loading, setLoading] = React.useState(false); // loading animation in clicking submit to prevent multiple submits
  const [open, setOpen] = React.useState(true);
  const [successRegister, setSuccessRegister] = React.useState(false);
  const usersCollectionRef = collection(db, "students");
  const [emptyFields, setEmptyFields] = React.useState(false)

  const allFields = [
    firstnameRef,
    middlenameRef,
    lastnameRef,
    birthdayRef,
    genderRef,
    studentNumberRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
  ];

  const handleChange = (newValue) => {
    setValue(newValue);
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

  // check all fields if empty
  React.useEffect(() => {
    allFields.map((field) => {
      if (field.current.value == "") {
        return setEmptyFields(true)
      }
    });
  }, [emptyFields]);

  // register button is clicked
  const handleRegister = async (e) => {
    e.preventDefault();

    const fieldsValue = {
      firstname: firstnameRef.current.value,
      middlename: middlenameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      // birthday: birthdayRef.current.value,
      gender: genderRef.current.value,
      student_number: studentNumberRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(emptyFields);
    if (emptyFields) { 
      setEmptyFields(false)
      return setError("Please input all fields");
    }
    // check if password and confirm password are the same
    else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Password do not match");
    } else {
      try {
        setLoading(true);
        // await addDoc(usersCollectionRef, fieldsValue);
        setSuccessRegister(true);
      } catch {
        return setError("Failed to register the student");
      }
    }

    setLoading(false);
    // setSuccessRegister(false)
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
                {error}
              </Alert>
            </Collapse>
          )}
          {/* Display Alert Success */}
          {successRegister && (
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
