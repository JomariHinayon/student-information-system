import { Typography, Box } from '@mui/material'
import React from 'react'

const Page404 = () => {
  return (
    <Box
    component="div"
    m="auto"
    p={1}
    bgcolor="#ECF9FF"
    textAlign="center"
    justifyContent="center"
    padding={5}
  >
    <Typography
    variant='h1'
    component='p'
    >
        404 Page not found
    </Typography>
    </Box>
  )
}

export default Page404