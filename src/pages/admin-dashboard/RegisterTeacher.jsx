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
import { subjectsAvailable } from "../../data/data";

const RegisterTeacher = () => {
  const [loading, setLoading] = React.useState(false);
  const firstname = React.useRef();
  const middlename = React.useRef();
  const lastname = React.useRef();
  const email = React.useRef();
  const password = React.useRef();
  const birthday = React.useRef();
  const gender = React.useRef();
  const conpassword = React.useRef();
  const teacherNumber = React.useRef();
  const [handledSubject, setHandledSubject] = React.useState();
  const [value, setValue] = React.useState();
  const [error, setError] = React.useState();
  const { registerTeacher } = useAuth();
  const [open, setOpen] = React.useState(true)
  const [successRegister, setSuccessRegister] = React.useState(false)

  // when date is clicked
  const handleChange = (newValue) => {
    setValue(newValue);
    setError("");
  };

  // convert date to firebase timestamp
  function ConvertedDate() {
    const bdayTimestamp = firebase.firestore.Timestamp.fromDate(
      new Date(birthday.current.value)
    ).toDate();

    return bdayTimestamp;
  }

  // register is click
  const handleRegister = async (e) => {
    e.preventDefault();

    const fieldsValue = {
      firstname: firstname.current.value,
      middlename: middlename.current.value,
      lastname: lastname.current.value,
      email: email.current.value,
      birthday: ConvertedDate(),
      gender: gender.current.value,
      teacher_number: teacherNumber.current.value,
      password: password.current.value,
      handled_subject: handledSubject,
    };

    // check if password and confirm password are the same
    if (password.current.value !== conpassword.current.value) {
      return setError("Password do not match");
    }

    try {
      setError("");
      setLoading(true);
      await registerTeacher(
        email.current.value,
        password.current.value,
        fieldsValue
      );
      setSuccessRegister(true);
    } catch (error) {
      console.log(error);
      setError("Failed to register the student");
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
          Register Teacher
        </Typography>

        <Grid container spacing={2}>
          <Grid xs={4}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              type="text"
              sx={{ width: 300 }}
              inputRef={firstname}
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
              inputRef={middlename}
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
              inputRef={lastname}
            />
          </Grid>
          <Grid xs={5}>
            <TextField
              inputRef={email}
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
                inputRef={birthday}
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
                  inputRef={gender}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  inputRef={gender}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <TextField
              id="outlined-basic"
              label="Teacher Number"
              variant="outlined"
              type="number"
              sx={{ width: 300 }}
              inputRef={teacherNumber}
              required
            />
          </Grid>
          <Grid xs={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={subjectsAvailable}
              onChange={(event, value) => setHandledSubject(value)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Handle Subject" />
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
              inputRef={password}
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
              inputRef={conpassword}
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
  );
};

export default RegisterTeacher;
