import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { getAllProfiles, addProfile, updateProfile, deleteProfile } from '../data/profiles';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  title: Yup.string().required('Title is required'),
  location: Yup.string().required('Location is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  description: Yup.string().required('Description is required'),
  bio: Yup.string().required('Bio is required'),
  interests: Yup.array().min(1, 'At least one interest is required')
});

const AdminDashboard = ({ onProfileUpdate }) => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fetchedProfiles = await getAllProfiles();
        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setSnackbar({
          open: true,
          message: 'Error fetching profiles',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
      location: '',
      email: '',
      phone: '',
      description: '',
      bio: '',
      interests: [],
      coordinates: { lat: 0, lng: 0 },
      image: 'https://source.unsplash.com/random/300x300?portrait'
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (editingProfile) {
          await updateProfile(editingProfile.id, values);
          setSnackbar({
            open: true,
            message: 'Profile updated successfully',
            severity: 'success'
          });
        } else {
          await addProfile(values);
          setSnackbar({
            open: true,
            message: 'Profile added successfully',
            severity: 'success'
          });
        }
        onProfileUpdate();
        handleCloseDialog();
      } catch (error) {
        console.error('Error saving profile:', error);
        setSnackbar({
          open: true,
          message: 'Error saving profile',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    }
  });

  const handleOpenDialog = (profile = null) => {
    if (profile) {
      setEditingProfile(profile);
      formik.setValues(profile);
    } else {
      setEditingProfile(null);
      formik.resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProfile(null);
    formik.resetForm();
  };

  const handleDeleteProfile = async (id) => {
    try {
      setLoading(true);
      await deleteProfile(id);
      onProfileUpdate();
      setSnackbar({
        open: true,
        message: 'Profile deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting profile:', error);
      setSnackbar({
        open: true,
        message: 'Error deleting profile',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpenDialog()}
        >
          Add New Profile
        </Button>
      </Box>

      {/* Profile List */}
      <Box sx={{ mt: 4 }}>
        {profiles.map((profile) => (
          <Box
            key={profile.id}
            sx={{
              p: 2,
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant="h6">{profile.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.title} - {profile.location}
              </Typography>
            </Box>
            <Box>
              <Button
                onClick={() => handleOpenDialog(profile)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                color="error"
                onClick={() => handleDeleteProfile(profile.id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Edit/Add Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProfile ? 'Edit Profile' : 'Add New Profile'}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              name="location"
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              name="phone"
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              fullWidth
              margin="normal"
              name="description"
              label="Description"
              multiline
              rows={2}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
              fullWidth
              margin="normal"
              name="bio"
              label="Bio"
              multiline
              rows={4}
              value={formik.values.bio}
              onChange={formik.handleChange}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminDashboard; 