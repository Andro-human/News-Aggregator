import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
      <Box sx={{
        display: "flex",
        backgroundColor: "rgb(31, 41, 55)",
        width: "100%",
        height: "4rem",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2rem"
      }}>
        <Typography sx={{color: "rgb(226, 226, 226)"}}>
        Copyright © 2024 Animesh Sinha - All Rights Reserved.
        </Typography>
      </Box>  
  )
}

export default Footer
