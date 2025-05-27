import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const PROFILES_COLLECTION = 'profiles';

// Add a new profile
export const addProfile = async (profileData) => {
  try {
    const docRef = await addDoc(collection(db, PROFILES_COLLECTION), {
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { id: docRef.id, ...profileData };
  } catch (error) {
    console.error('Error adding profile:', error);
    throw error;
  }
};

// Get all profiles
export const getAllProfiles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PROFILES_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting profiles:', error);
    throw error;
  }
};

// Get a profile by ID
export const getProfileById = async (id) => {
  try {
    const docRef = doc(db, PROFILES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Profile not found');
    }
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
};

// Update a profile
export const updateProfile = async (id, profileData) => {
  try {
    const docRef = doc(db, PROFILES_COLLECTION, id);
    await updateDoc(docRef, {
      ...profileData,
      updatedAt: new Date().toISOString()
    });
    return { id, ...profileData };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Delete a profile
export const deleteProfile = async (id) => {
  try {
    const docRef = doc(db, PROFILES_COLLECTION, id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

// Search profiles
export const searchProfiles = async (searchTerm) => {
  try {
    const querySnapshot = await getDocs(collection(db, PROFILES_COLLECTION));
    const profiles = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    const searchTermLower = searchTerm.toLowerCase();
    return profiles.filter(profile => 
      profile.name.toLowerCase().includes(searchTermLower) ||
      profile.title.toLowerCase().includes(searchTermLower) ||
      profile.location.toLowerCase().includes(searchTermLower) ||
      profile.interests.some(interest => 
        interest.toLowerCase().includes(searchTermLower)
      )
    );
  } catch (error) {
    console.error('Error searching profiles:', error);
    throw error;
  }
}; 