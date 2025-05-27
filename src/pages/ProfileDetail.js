import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getProfileById, deleteProfile } from '../data/profiles';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const ProfileDetail = ({ onProfileUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileById(id);
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await deleteProfile(id);
      onProfileUpdate();
      navigate('/profiles');
    } catch (error) {
      console.error('Error deleting profile:', error);
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Container>
        <Typography variant="h5" color="error" align="center">
          Profile not found
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/profiles')}
          >
            Back to Profiles
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate('/profiles')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Profile Details
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="primary"
          onClick={() => navigate(`/profile/edit/${id}`)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <Box
              component="img"
              src={profile.image}
              alt={profile.name}
              sx={{
                width: '100%',
                height: 300,
                objectFit: 'cover'
              }}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {profile.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {profile.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {profile.location}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body2">
                  Email: {profile.email}
                </Typography>
                <Typography variant="body2">
                  Phone: {profile.phone}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Interests
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {profile.interests.map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      size="small"
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography variant="body1" paragraph>
                {profile.bio}
              </Typography>
              <Typography variant="body1">
                {profile.description}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={profile.coordinates}
                  zoom={12}
                >
                  <Marker
                    position={profile.coordinates}
                    title={profile.name}
                  />
                </GoogleMap>
              </LoadScript>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Profile</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {profile.name}'s profile? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfileDetail; 