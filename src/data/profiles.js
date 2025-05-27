import { 
  getAllProfiles as getFirebaseProfiles,
  getProfileById as getFirebaseProfileById,
  searchProfiles as searchFirebaseProfiles,
  addProfile as addFirebaseProfile,
  updateProfile as updateFirebaseProfile,
  deleteProfile as deleteFirebaseProfile
} from '../services/profileService';

// Initial profiles data for first-time setup
const initialProfiles = [
  {
    id: 1,
    name: 'Pratiksha Padwal',
    title: 'Senior Software Engineer',
    location: 'Aurangabad, Maharashtra',
    coordinates: { lat: 19.7515, lng: 75.7139 },
    image: 'img1.webp',
    description: 'Full-stack developer with 5+ years of experience in React and modern web technologies.',
    email: 'pratiksha.padwal@example.com',
    phone: '+91 98765 43210',
    interests: ['React', 'JavaScript', 'Web Development', 'UI/UX Design', 'Node.js', 'MongoDB'],
    bio: 'Pratiksha is a passionate software engineer based in Aurangabad, Maharashtra. She specializes in building scalable web applications using React and modern JavaScript frameworks. With expertise in both frontend and backend development, she has successfully delivered numerous projects for clients across India.',
    education: 'B.Tech in Computer Science, Dr. Babasaheb Ambedkar Marathwada University',
    languages: ['English', 'Marathi', 'Hindi'],
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Git', 'AWS'],
    experience: [
      {
        company: 'Tech Solutions India',
        position: 'Senior Software Engineer',
        duration: '2020 - Present',
        location: 'Aurangabad, Maharashtra'
      }
    ]
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    title: 'Tech Lead',
    location: 'Mumbai, Maharashtra',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    image: 'https://source.unsplash.com/random/300x300?portrait=2',
    description: 'Tech Lead with 8+ years of experience in enterprise applications and cloud architecture.',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 12345',
    interests: ['Java', 'Spring Boot', 'Microservices', 'Cloud Computing', 'DevOps', 'System Design'],
    bio: 'Rahul leads a team of developers at a prominent Mumbai-based tech company. He has extensive experience in building scalable enterprise applications and implementing cloud solutions. His expertise in Java and microservices architecture has helped numerous organizations modernize their technology stack.',
    education: 'M.Tech in Computer Science, IIT Mumbai',
    languages: ['English', 'Hindi', 'Marathi'],
    skills: ['Java', 'Spring Boot', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'System Design'],
    experience: [
      {
        company: 'Enterprise Solutions Ltd',
        position: 'Tech Lead',
        duration: '2019 - Present',
        location: 'Mumbai, Maharashtra'
      }
    ]
  },
  {
    id: 3,
    name: 'Priya Patel',
    title: 'Senior UI/UX Designer',
    location: 'Pune, Maharashtra',
    coordinates: { lat: 18.5204, lng: 73.8567 },
    image: 'https://source.unsplash.com/random/300x300?portrait=3',
    description: 'Creative designer with 6+ years of experience in user experience and interface design.',
    email: 'priya.patel@example.com',
    phone: '+91 98765 67890',
    interests: ['UI Design', 'User Experience', 'Figma', 'Prototyping', 'Design Systems', 'User Research'],
    bio: 'Priya is a talented UI/UX designer based in Pune, known for creating intuitive and engaging user interfaces. She has worked with various startups and established companies in Maharashtra, helping them build user-centric digital products.',
    education: 'B.Des in Interaction Design, MIT Institute of Design, Pune',
    languages: ['English', 'Marathi', 'Hindi', 'Gujarati'],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping', 'Design Systems'],
    experience: [
      {
        company: 'Design Innovations',
        position: 'Senior UI/UX Designer',
        duration: '2021 - Present',
        location: 'Pune, Maharashtra'
      }
    ]
  },
  {
    id: 4,
    name: 'Amit Deshmukh',
    title: 'Data Scientist',
    location: 'Nagpur, Maharashtra',
    coordinates: { lat: 21.1458, lng: 79.0882 },
    image: 'https://source.unsplash.com/random/300x300?portrait=4',
    description: 'Data Scientist specializing in machine learning and predictive analytics.',
    email: 'amit.deshmukh@example.com',
    phone: '+91 98765 23456',
    interests: ['Machine Learning', 'Python', 'Data Analysis', 'AI', 'Big Data', 'Deep Learning'],
    bio: 'Amit is a skilled Data Scientist working in Nagpur, focusing on implementing machine learning solutions for various industries. He has expertise in developing predictive models and analyzing large datasets to drive business decisions.',
    education: 'M.Sc in Data Science, VNIT Nagpur',
    languages: ['English', 'Marathi', 'Hindi'],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Data Analysis', 'Machine Learning'],
    experience: [
      {
        company: 'Data Insights Solutions',
        position: 'Senior Data Scientist',
        duration: '2020 - Present',
        location: 'Nagpur, Maharashtra'
      }
    ]
  },
  {
    id: 5,
    name: 'Neha Kulkarni',
    title: 'Mobile App Developer',
    location: 'Nashik, Maharashtra',
    coordinates: { lat: 20.0059, lng: 73.7897 },
    image: 'https://source.unsplash.com/random/300x300?portrait=5',
    description: 'Mobile app developer specializing in React Native and Flutter development.',
    email: 'neha.kulkarni@example.com',
    phone: '+91 98765 34567',
    interests: ['React Native', 'Flutter', 'Mobile Development', 'iOS', 'Android', 'UI/UX'],
    bio: 'Neha is an experienced mobile app developer based in Nashik, known for building cross-platform mobile applications. She has successfully delivered numerous apps for clients across Maharashtra, focusing on creating smooth and responsive user experiences.',
    education: 'B.E in Computer Engineering, K.K. Wagh Institute of Engineering',
    languages: ['English', 'Marathi', 'Hindi'],
    skills: ['React Native', 'Flutter', 'JavaScript', 'TypeScript', 'Mobile UI/UX', 'Firebase'],
    experience: [
      {
        company: 'Mobile Solutions India',
        position: 'Lead Mobile Developer',
        duration: '2019 - Present',
        location: 'Nashik, Maharashtra'
      }
    ]
  }
];

// Initialize profiles in Firebase (run this once)
export const initializeProfiles = async () => {
  try {
    const existingProfiles = await getFirebaseProfiles();
    if (existingProfiles.length === 0) {
      // Only add initial profiles if the database is empty
      for (const profile of initialProfiles) {
        await addFirebaseProfile(profile);
      }
    }
  } catch (error) {
    console.error('Error initializing profiles:', error);
  }
};

// Get all profiles
export const getAllProfiles = async () => {
  try {
    return await getFirebaseProfiles();
  } catch (error) {
    console.error('Error getting profiles:', error);
    return [];
  }
};

// Get a profile by ID
export const getProfileById = async (id) => {
  try {
    return await getFirebaseProfileById(id);
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
};

// Search profiles
export const searchProfiles = async (query) => {
  try {
    return await searchFirebaseProfiles(query);
  } catch (error) {
    console.error('Error searching profiles:', error);
    return [];
  }
};

// Add a new profile
export const addProfile = async (profileData) => {
  try {
    return await addFirebaseProfile(profileData);
  } catch (error) {
    console.error('Error adding profile:', error);
    throw error;
  }
};

// Update a profile
export const updateProfile = async (id, profileData) => {
  try {
    return await updateFirebaseProfile(id, profileData);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Delete a profile
export const deleteProfile = async (id) => {
  try {
    return await deleteFirebaseProfile(id);
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
}; 