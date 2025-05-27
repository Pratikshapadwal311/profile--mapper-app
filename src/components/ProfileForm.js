import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Chip,
  IconButton,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { addProfile, getProfileById, updateProfile } from '../data/profiles';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  title: Yup.string().required('Title is required'),
  location: Yup.string().required('Location is required'),
  coordinates: Yup.object({
    lat: Yup.number().required('Latitude is required'),
    lng: Yup.number().required('Longitude is required')
  }),
  description: Yup.string().required('Description is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  interests: Yup.array().min(1, 'At least one interest is required'),
  bio: Yup.string().required('Bio is required')
});

const ProfileForm = ({ onProfileUpdate }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
      location: '',
      coordinates: { lat: 0, lng: 0 },
      description: '',
      email: '',
      phone: '',
      interests: [],
      bio: '',
      image: 'https://source.unsplash.com/random/300x300?portrait'
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (id) {
          await updateProfile(id, values);
        } else {
          await addProfile(values);
        }
        onProfileUpdate();
        navigate('/profiles');
      } catch (error) {
        console.error('Error saving profile:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          setLoading(true);
          const profile = await getProfileById(id);
          if (profile) {
            formik.setValues(profile);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [id]);

  const handleAddInterest = () => {
    if (newInterest && !formik.values.interests.includes(newInterest)) {
      formik.setFieldValue('interests', [...formik.values.interests, newInterest]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    formik.setFieldValue(
      'interests',
      formik.values.interests.filter((i) => i !== interest)
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {id ? 'Edit Profile' : 'Add New Profile'}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  multiline
                  rows={2}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="bio"
                  label="Bio"
                  multiline
                  rows={4}
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Interests
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      size="small"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Add interest"
                    />
                    <IconButton onClick={handleAddInterest} color="primary">
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formik.values.interests.map((interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        onDelete={() => handleRemoveInterest(interest)}
                        deleteIcon={<DeleteIcon />}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/profiles')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Save Profile'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileForm; 