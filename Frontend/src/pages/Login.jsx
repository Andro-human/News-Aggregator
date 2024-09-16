// import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import backgroundImage from "../assets/loginBackground.jpg";
import { useState } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
// import { setLoading, userExists } from "../redux/reducers/auth";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    //   dispatch(setLoading(true));
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}api/v1/auth/login`,
        {
          username: username,
          password: password,
        }
      );
      // dispatch(userExists(data?.user));
      setTimeout(() => {
        toast.success(data?.message);
      }, 500);
    } catch (error) {
      setTimeout(() => {
        toast.error(
          error?.response?.data?.message || "Error Occurred during login"
        );
      }, 500);
    } finally {
      // dispatch(setLoading(false));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    //   dispatch(setLoading(true));
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}api/v1/auth/new`,
        { username: username, password: password }
      );

    //   dispatch(userExists(data?.user));
      setTimeout(() => {
        toast.success(data?.message);
      }, 500);
    } catch (error) {
      setTimeout(() => {
        toast.error(
          error?.response?.data?.message || "Error Occurred during SignUp"
        );
      }, 500);
    } finally {
    //   dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <Container
          component={"main"}
          maxWidth="sm"
          sx={{
            justifyContent: "center",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 4,
              margin: "auto",
            }}
          >
            {isLogin ? (
              <>
                <Typography variant="h3" component="h1">
                  Login
                </Typography>
                <form onSubmit={handleLogin}>
                  {/* <Typography variant="span" label='Email'>Email</Typography> */}
                  <TextField
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    variant="filled"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    variant="filled"
                    margin="normal"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ display: "flex", margin: "1rem auto" }}
                  >
                    Login
                  </Button>
                  <Typography variant="text">
                    Don&apos;t have an account?
                  </Typography>
                  <Button
                    color="secondary"
                    onClick={() => setIsLogin(false)}
                    style={{ paddingBottom: "1.2vh" }}
                  >
                    Register
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography variant="h3">Register</Typography>
                <form onSubmit={handleSignUp}>
                  <TextField
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    variant="filled"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    variant="filled"
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ display: "flex", margin: "1rem auto" }}
                  >
                    Register
                  </Button>
                  <Typography variant="text">
                    Already have an account?
                  </Typography>
                  <Button
                    color="secondary"
                    onClick={() => setIsLogin(true)}
                    style={{ paddingBottom: "1.2vh" }}
                  >
                    Login
                  </Button>
                </form>
              </>
            )}
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Login;
