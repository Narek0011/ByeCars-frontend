import React, {useEffect} from 'react';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import {useNavigate} from "react-router";

const primary = purple[500];

const NoMatch = ({ setShowHeaderAndFooter }) => {

  const navigate = useNavigate();

  useEffect(() => {
    setShowHeaderAndFooter(false)
  },[]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained"
      onClick={() => {
        navigate("/");
        setShowHeaderAndFooter(true);
      }}
      >Back Home</Button>
    </Box>
  );
};

export default NoMatch;
