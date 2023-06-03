import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { auth } from "../../../firebaseService";


const theme = createTheme({
    typography: {
      fontSize: 17,
    },
  }
);
export default function Login () {

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
      .then(({user}) => {
        localStorage.setItem("admin",user.providerData[0].uid);
        navigate('/admin/cars')
    }).catch((error) => {
        console.error( error.code, error.message );
        alert("Invalid user!")
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              autoComplete="email"
              autoFocus
              id="email-address"
              type="email"
              name="email"
              label="Email"
              required
              placeholder="Email"
            />
            <TextField
              margin="normal"
              fullWidth
              autoComplete="current-password"
              id="password"
              type="password"
              name="password"
              label="Password"
              required
              placeholder="Password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <Typography component="h1" variant="h5">
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

