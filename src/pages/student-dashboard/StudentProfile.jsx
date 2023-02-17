import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import StudentDefaultImage from "../../assets/student-default-image.jpg";
import { useAuth } from "../../context/AuthContext";

const StudentProfile = () => {
  const {currentUser} = useAuth()

  return (
    <Box sx={{ flexGrow: 1 }} paddingTop={10}>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid xs={12} item={true}>
          <img src={StudentDefaultImage} width={150} />
        </Grid>
        <Grid xs={12} item={true}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h4" component="p">Lastname,</Typography>
            <Typography variant="h4" component="p">Firstname</Typography>
            <Typography variant="h4" component="p">M.I</Typography>
          </Stack>
          <Typography variant="h6" component="p">Email: {currentUser.email}</Typography>
          <Typography variant="h6" component="p">Phone Number: 092123123</Typography>
          <Typography variant="h6" component="p">Residence: Kasiglahan</Typography>
          <Typography variant="h6" component="p">Birthdate: January 1, 2021</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentProfile;
