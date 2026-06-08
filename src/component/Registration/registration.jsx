import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { registerUser } from "../Services/auth.service";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from '../config/svgfiles/PowerOptimus_Logo_WithoutBG.svg'
import "./register.css";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isUser, setIsUser] = useState(true);
   const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleFocusChange = (event) => {
    setIsFocused(event.target === document.activeElement);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^[A-Za-z]+$/.test(firstName)) {
      setErrorMessage("Invalid first name");
      setShowError(true);
      return;
    }
    if (!/^[A-Za-z]+$/.test(lastName)) {
      setErrorMessage("Invalid last name");
      setShowError(true);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format");
      setShowError(true);
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      setShowError(true);
      return;
    }
    setShowError(false);
    setErrorMessage("");
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleIsUser = () => {
    setIsUser(true);
  };

  const handleIsAdmin = () => {
    setIsUser(false);
  };

  const handleRegister = async () => {
    try {
      const registerObj = {
        firstName,
        lastName,
        email,
        password,
        role: 'USER'
      }
      const resp = await registerUser(registerObj);
      if (resp) {
        setShowSuccess(true);
        setErrorMessage(resp?.message);
        setSnackbarOpen(true);
        setTimeout(() => {
          setShowError(false);
          navigate("/");
        }, 3000);
      } else {
        setShowError(true);
        setErrorMessage("Registration Failed!!");
        setSnackbarOpen(true);
        setTimeout(() => {
          setPassword("");
          setShowError(false);
          navigate("/register");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 4px 12px rgba(149, 19, 230, 0.25)",
      backgroundColor: "rgba(255,255,255, 0.24)",
    },
    thinNBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 4px 12px rgba(100, 150, 155, 0.5)",
      backgroundColor: "rgba(255,255,255, 0.24)",
    },
    valid: {
      borderColor: "#09A603",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#09A603",
      },
    },
    invalid: {
      borderColor: "#F20505",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#F20505",
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
          width: "75%",
          margin: "auto",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            width: "100%",
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              margin: "auto",
              padding: "45px",
              borderRadius: "20px",
              background: "rgba(255,255,255, 0.24)",
              width: "35%",
              flexWrap: "wrap",
              border: styles.thinBorder,
            }}
          >
            <Logo style={{ margin: 0, padding: 0, display: 'block', width: '100%', height: '79', marginLeft: -15, marginTop: -38, top: 10, position: 'relative' }} />
            <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <div className="slider-container">
                <div className="slider">
                  <div
                    className={`slider-button ${isUser ? "left" : "right"}`}
                  />
                  <div className="slider-labels">
                    <Button
                      color={isUser ? "primary" : "inherit"}
                      onClick={handleIsUser}
                      disabled={isUser ? true : false}
                      sx={{
                        "&:hover": {
                          opacity: 1,
                          backgroundColor: "transparent",
                        },
                        "&.Mui-disabled": {
                          opacity: 1,
                          color: "#9513e6",
                        },
                      }}
                    >
                      {isUser ? (
                        <Typography fontWeight="normal">User</Typography>
                      ) : (
                        "User"
                      )}
                    </Button>
                    <Button
                      color={!isUser ? "primary" : "inherit"}
                      onClick={handleIsAdmin}
                      disabled={isUser ? false : true}
                      sx={{
                        "&:hover": {
                          opacity: 1,
                          backgroundColor: "transparent",
                        },
                        "&.Mui-disabled": {
                          opacity: 1,
                          color: "#9513e6",
                        },
                      }}
                    >
                      {!isUser ? (
                        <Typography fontWeight="normal">Admin</Typography>
                      ) : (
                        "Admin"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Box>
            <Typography
              variant="h6"
              fontSize="xx-large"
              align="center"
              gutterBottom
              fontWeight="bold"
              sx={{ marginTop: "25px" }}
            >
              SIGN UP
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic-fname"
                name="firstName"
                type="text"
                label="FirstName"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{
                  marginTop: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                }}
              />
              <TextField
                id="outlined-basic-lname"
                name="lastName"
                type="text"
                label="LastName"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{
                  marginTop: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                }}
              />
              <TextField
                id="outlined-basic-em"
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  marginTop: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                }}
              />
              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                }}
                onBlur={handleFocusChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon
                            color={isFocused ? "primary" : "action"}
                          />
                        ) : (
                          <VisibilityIcon
                            color={isFocused ? "primary" : "action"}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
              </Box>
              <Button
                variant="outlined"
                color="inherit"
                fullWidth
                type="submit"
                sx={{
                  marginTop: "30px",
                  color: "rgba(121, 15, 240, 0.77)",
                  background:
                    "linear-gradient(90deg, rgba(183,135,238,1) 0%, rgba(149,19,230,1) 100%)",
                  borderRadius: "20px",
                }}
                onClick={handleRegister}
              >
                <Typography color="white" fontWeight="bold">
                  Sign up
                </Typography>
              </Button>
              <Box textAlign="center" marginTop="20px">
                <Typography margin="auto">
                  Already Have An Account?{" "}
                  <Link
                    component="button"
                    variant="body1"
                    color="inherit"
                    fontWeight="bold"
                    onClick={() => navigate('/')}
                  >
                    Login
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Alert onClose={handleSnackbarClose} severity={showSuccess ? 'success' : 'error'} variant="filled" sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </div>
  );
};

export default Registration;
