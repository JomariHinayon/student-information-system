import React from "react";
import candles from "../assets/graduation-image.jpg";
import  Box from "@mui/material/Box";

const Home = () => {
  return (
    <Box
      className="candles"
      style={{
        backgroundImage: `url(${candles})`,
        backgroundSize: "cover",
        height: "90vh",
        color: "#f5f5f5",
      }}
    />
  );
};

export default Home;
