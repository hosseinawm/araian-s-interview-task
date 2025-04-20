import {
  Container,
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/authSlice";

import companyLogo from "../../assets/arianaLogo.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = () => {
    setUserError(false);
    setPassError(false);
    setInvalid(false);
    axios
      .post("https://mock.arianalabs.io/api/staff/auth/", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("Login successfull!", response.data);
        dispatch(setToken(response.data.token));
        navigate("/dashboard/");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data?.username) {
          setUserError(true);
        }
        if (error.response.data?.password) {
          setPassError(true);
        }
        if (error.response.data.non_field_errors) {
          setInvalid(true);
        }
      });
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ marginTop: 10, width: "384px" }}>
        <Paper sx={{ p: 4 }}>
          <Stack spacing={2}>
            <img
              style={{
                width: "296px",
                height: "112px",
                marginLeft: "10px",
                marginBottom: "30px",
              }}
              src={companyLogo}
              alt="Logo"
            />
            <Box>
              <Typography variant="h4">Login</Typography>
              <Typography>
                Enter your username and password to login to your account
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h5"
                color={userError ? "error" : "textPrimary"}
              >
                Username
              </Typography>
              <TextField
                sx={{ width: "100%" }}
                placeholder={userError ? "" : "Please enter your username"}
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              {userError ? (
                <Typography variant="subtitle1" color="error" sx={{ mt: 1 }}>
                  Username is required
                </Typography>
              ) : (
                ""
              )}
            </Box>

            <Box>
              <Typography
                variant="h5"
                color={passError ? "error" : "textPrimary"}
              >
                Password
              </Typography>
              <TextField
                sx={{ width: "100%" }}
                placeholder={passError ? "" : "Please enter your password"}
                value={password}
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              {passError ? (
                <Typography variant="subtitle1" color="error" sx={{ mt: 1 }}>
                  Password is required
                </Typography>
              ) : (
                ""
              )}
            </Box>
            {invalid ? (
              <Typography variant="subtitle1" color="error" sx={{ pl: 6 }}>
                Invalid username or password
              </Typography>
            ) : (
              ""
            )}
            <Button
              variant="contained"
              sx={{ bgcolor: "black" }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Typography sx={{ pl: 5 }}>
              Don't have an account?{" "}
              <Link
                to="/register/"
                style={{ marginLeft: "3px", color: "black" }}
              >
                Sign up
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
