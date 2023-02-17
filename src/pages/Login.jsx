import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useAuth } from "../context/AuthContext";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const { login } = useAuth();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (emailRef.current.value == "" || passwordRef.current.value == "") {
      setError("Please input all fields");
    } else {
      try {
        setError("");
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
        navigate('/student/profile')
      } catch {
        setError("Invalid email or password");
      }
    }
    setLoading(false);
  };

  return (
    // <Box m="auto">

    // </Box>
    <Box display="flex" height={500}>
      <Box
        component="form"
        m="auto"
        p={1}
        bgcolor="#ECF9FF"
        textAlign="center"
        padding={5}
        onSubmit={handleLogin}
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
        <Stack spacing={2}>
          <Typography
            variant="h4"
            component="p"
            color="#567189"
            alignSelf="start"
          >
            Login
          </Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            sx={{ width: 350 }}
            inputRef={emailRef}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            sx={{ width: 350 }}
            inputRef={passwordRef}
          />
          <FormControlLabel control={<Checkbox />} label="Remember Me" />
        </Stack>
        <Button
          variant="contained"
          size="medium"
          sx={{ backgroundColor: "#7B8FA1", width: 200 }}
          type="submit"
          disabled={loading}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
