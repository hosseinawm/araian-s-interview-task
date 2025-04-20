import {
  Box,
  Typography,
  Drawer,
  Avatar,
  Button,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

import emptyDashboard from "../../assets/emptyLogo.jpg";
import dashboardLogo from "../../assets/dashboardLogo.jpg";

const Dashboard = () => {
  const [users, setUsers] = useState({});
  const [openLogout, setOpenLogOut] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleLogOut = async () => {
    try {
      await axios.delete("https://mock.arianalabs.io/api/staff/auth", {
        headers: {
          authorization: `token ${token}`,
        },
      });
      dispatch(logout());
      navigate("/login/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "https://mock.arianalabs.io/api/staff/current_user/",
        {
          headers: {
            authorization: `token ${token}`,
          },
        }
      );

      console.log(response.data);
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            bgcolor: "#F8FAFC",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          },
        }}
      >
        <Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Avatar
              alt="username"
              src={users.avatar}
              sx={{ width: 100, height: 100, mb: 1 }}
            />
            <Typography variant="h6">
              {`${users.first_name} ${users.last_name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{users.username}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => setOpenLogOut(true)}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "#F8FAFC",
            height: 64,
            justifyContent: "center",
          }}
        >
          <Toolbar>
            <img src={dashboardLogo} alt="Logo" style={{ height: 40 }} />
          </Toolbar>
        </AppBar>
        <Dialog open={openLogout} onClose={() => setOpenLogOut(false)}>
          <DialogTitle>Confirm Sign Out</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to sign out of your account?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenLogOut(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogOut} color="error" variant="contained">
              Logout
            </Button>
          </DialogActions>
        </Dialog>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "481px", height: "481px" }}
            src={emptyDashboard}
            alt="dashboard"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
