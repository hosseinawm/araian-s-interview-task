import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Stack,
  Paper,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/authSlice";

import companyLogo from "../../assets/arianaLogo.jpg";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [userError, setUserError] = useState(false);
  const [passError, setpassError] = useState(false);
  const [preview, setPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setAvatarFile(file);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setUserError(false);
    setpassError(false);

    const formData = new FormData();
    formData.append("first_name", name);
    formData.append("last_name", lastName);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("confirm_password", confirmPass);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    axios
      .post("https://mock.arianalabs.io/api/staff/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log("Register successfull!", response.data);
        dispatch(setToken(response.data.token));
        navigate("/dashboard/");
      })
      .catch(function (error) {
        console.log(error);
        if (
          error.response.data.non_field_errors?.[0] ===
          "Username already exists."
        ) {
          setUserError(true);
        }
        if (
          error.response.data.non_field_errors?.[0] ===
          "Passwords do not match."
        ) {
          setpassError(true);
        }
      });
  };
  return (
    <>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Paper sx={{ p: 4 }}>
            <Stack spacing={2}>
              <img
                style={{
                  width: "248px",
                  height: "64px",
                  marginLeft: "40px",
                  marginBottom: "20px",
                }}
                src={companyLogo}
                alt="Logo"
              />

              <Box>
                <Typography variant="h4">Sign in</Typography>
                <Typography>
                  Enter your information to create an account.
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid rgb(201, 205, 209)",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Avatar
                  sx={{ width: "48px", height: "48px", margin: 1 }}
                  src={preview}
                />
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    height: "36px",
                    width: "87px",
                    margin: 2,
                    border: "1px solid rgb(201, 205, 209)",
                    color: "black",
                    fontWeight: "bold",
                    paddingTop: 1,
                  }}
                >
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Box>
              <Box>
                <Typography variant="h5">First name</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  placeholder="Please enter your first name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Box>
              <Box>
                <Typography variant="h5">Last name</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  placeholder="Please enter your last name"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </Box>
              <Box>
                <Typography variant="h5">Username</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  placeholder="Please enter Username"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                {userError ? (
                  <Typography variant="subtitle1" color="error" sx={{ mt: 1 }}>
                    This username is already taken.
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              <Box>
                <Typography variant="h5">Password</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  placeholder="Please enter Password"
                  value={password}
                  type="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Box>
              <Box>
                <Typography variant="h5">Confirm password</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  placeholder="Please re-enter your Password"
                  value={confirmPass}
                  type="password"
                  onChange={(event) => {
                    setConfirmPass(event.target.value);
                  }}
                />
                {passError ? (
                  <Typography variant="subtitle1" color="error" sx={{ mt: 1 }}>
                    Passwords do not match.
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              <Button
                variant="contained"
                sx={{ bgcolor: "black" }}
                disabled={
                  !name || !lastName || !password || !confirmPass || !username
                }
                onClick={handleRegister}
              >
                Register
              </Button>
              <Typography sx={{ display: "flex", justifyContent: "center" }}>
                Already have an account?{" "}
                <Link style={{ marginLeft: "3px", color: "black" }} to="/">
                  Sign in
                </Link>
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Register;
