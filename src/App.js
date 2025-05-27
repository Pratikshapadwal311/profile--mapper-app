import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { initializeProfiles, getAllProfiles } from './data/profiles';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page components
import Home from './pages/Home';
import ProfileList from './pages/ProfileList';
import ProfileDetail from './pages/ProfileDetail';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import ProfileForm from './components/ProfileForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize Firebase with initial profiles
        await initializeProfiles();
        
        // Fetch all profiles
        const fetchedProfiles = await getAllProfiles();
        setProfiles(fetchedProfiles);
      } catch (err) {
        setError('Failed to initialize application: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      const updatedProfiles = await getAllProfiles();
      setProfiles(updatedProfiles);
    } catch (err) {
      setError('Failed to update profiles: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
          <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profiles" element={<ProfileList profiles={profiles} onProfileUpdate={handleProfileUpdate} />} />
              <Route path="/profiles/:id" element={<ProfileDetail onProfileUpdate={handleProfileUpdate} />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile/new" element={<ProfileForm onProfileUpdate={handleProfileUpdate} />} />
              <Route path="/profile/edit/:id" element={<ProfileForm onProfileUpdate={handleProfileUpdate} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
