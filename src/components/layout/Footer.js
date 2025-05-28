import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' Profile Mapper. All rights reserved. '}
          <Link color="inherit" href="/">
            Home
          </Link>
          {' | '}
          <Link color="inherit" href="/profiles">
            Profiles
          </Link>
          {' | '}
          <Link color="inherit" href="/admin">
            Admin
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 