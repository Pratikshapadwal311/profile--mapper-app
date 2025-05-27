import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteProfile } from '../data/profiles';

const ProfileList = ({ profiles, onProfileUpdate }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteClick = (profile) => {
    setProfileToDelete(profile);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (profileToDelete) {
      try {
        setLoading(true);
        await deleteProfile(profileToDelete.id);
        onProfileUpdate();
      } catch (error) {
        console.error('Error deleting profile:', error);
      } finally {
        setLoading(false);
        setDeleteDialogOpen(false);
        setProfileToDelete(null);
      }
    }
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.interests.some(interest =>
      interest.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profiles
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/profile/new')}
        >
          Add Profile
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search profiles..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {filteredProfiles.map((profile) => (
          <Grid item xs={12} sm={6} md={4} key={profile.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                  cursor: 'pointer'
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={profile.image}
                alt={profile.name}
                onClick={() => navigate(`/profiles/${profile.id}`)}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {profile.name}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/edit/${profile.id}`);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(profile);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {profile.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {profile.location}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {profile.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {profile.interests.slice(0, 3).map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchTerm(interest);
                      }}
                    />
                  ))}
                  {profile.interests.length > 3 && (
                    <Chip
                      label={`+${profile.interests.length - 3} more`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Profile</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {profileToDelete?.name}'s profile? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
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

export default ProfileList; 