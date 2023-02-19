import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import StudentDefaultImage from "../../assets/student-default-image.jpg";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const StudentProfile = () => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState();
  const { currentUser } = useAuth();
  const [bday, setBday] = useState("");

  // set user data
  useEffect(() => {
    const getUserData = async () => {
      const userDoc = doc(db, "students", `${currentUser?.email}`);
      const docSnap = await getDoc(userDoc);
      console.log(docSnap.data());
      setData({ ...docSnap.data() });
    };

    getUserData();
  }, [currentUser?.email]);

  // set user bday
  useEffect(() => {
    const fireBaseTime = new Date(
      data.birthday?.seconds * 1000 + data.birthday?.nanoseconds / 1000000
    );
    const date = fireBaseTime.toDateString();
    setBday(date);
  }, [data]);

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
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            padding={2}
          >
            <Typography variant="h4" component="p">
              {data.lastname?.charAt(0).toUpperCase() + data.lastname?.slice(1)}
              ,
            </Typography>
            <Typography variant="h4" component="p">
              {data.firstname?.charAt(0).toUpperCase() +
                data.firstname?.slice(1)}
              ,
            </Typography>
            <Typography variant="h4" component="p">
              {data.middlename?.charAt(0).toUpperCase()}.
            </Typography>
          </Stack>
          <Typography variant="h6" component="p" padding={1}>
            Course: {data.course}
          </Typography>
          <Typography variant="h6" component="p" padding={1}>
            Student Number: {data.student_number}
          </Typography>
          <Typography variant="h6" component="p" padding={1}>
            Sex: {data.gender?.charAt(0).toUpperCase()}
          </Typography>
          <Typography variant="h6" component="p" padding={1}>
            Email: {data.email}
          </Typography>
          <Typography variant="h6" component="p" padding={1}>
            Phone Number: 092123123
          </Typography>
          <Typography variant="h6" component="p" padding={1}>
            Residence: Kasiglahan
          </Typography>
          <Typography variant="h6" component="p" padding={1}>
            Birthdate: {bday}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentProfile;
