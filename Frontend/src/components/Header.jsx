import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "../userContext";
import axios from "axios";
import { useArticle } from "../../articleContext";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setArticles } = useArticle();
  const open = Boolean(anchorEl);
  const { logout } = useUser();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchData = async (option) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}api/v1/articles/new`,
        {
          category: option,
        }
      );
      // console.log("response", response.data);
      setArticles(response.data.data);
      // console.log("response", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuItemClick = async (option) => {
    // console.log("Selected Option:", option);
    await fetchData(option);
    handleClose();
  };

  const handleLogout = () => {
    // console.log("User has logged out.");

    logout();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "4rem",
        backgroundColor: "#495057",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "1rem",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#adb5bd",
            fontWeight: "bold",
            fontSize: {
              xs: "1rem",
              sm: "1.5rem",
            },
          }}
        >
          News Aggregator
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box
        sx={{
          margin: {
            xs: "0",
            sm: "1rem",
          },
          display: "flex",
          // gap: "1rem"
        }}
      >
        <Button
          onClick={handleClick}
          variant="contained"
          // color="#212529"
          sx={{
            backgroundColor: "#343a40",
            marginRight: "1rem",
            color: "white",
          }}
        >
          Load News
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuItemClick("business")}>
            Business
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("entertainment")}>
            Entertainment
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("health")}>
            Health
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("science")}>
            Science
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("technology")}>
            Technology
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("sports")}>
            Sports
          </MenuItem>
        </Menu>
        <Box
          onClick={handleLogout}
          sx={{
            cursor: "pointer",
            textDecoration: "none",
            margin: "0.6rem",
            fontSize: {
              xs: "0.9rem",
              sm: "1.2rem",
            },
            color: "white",
          }}
        >
          Logout
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
