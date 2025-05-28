// Initial profiles data
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
    bio: 'Pratiksha is a passionate software engineer based in Aurangabad, Maharashtra. She specializes in building scalable web applications using React and modern JavaScript frameworks.',
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
    image:'krishna.jpeg',
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
    image: 'tejas.jpg',
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
    image: 'image.jpeg',
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
    image: '',
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

// Local storage key
const STORAGE_KEY = 'profile_mapper_profiles';

// Helper function to get profiles from localStorage
const getStoredProfiles = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : initialProfiles;
};

// Helper function to save profiles to localStorage
const saveProfiles = (profiles) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
};

// Initialize profiles (run this once)
export const initializeProfiles = async () => {
  const storedProfiles = getStoredProfiles();
  if (storedProfiles.length === 0) {
    saveProfiles(initialProfiles);
  }
  return storedProfiles;
};

// Get all profiles
export const getAllProfiles = async () => {
  return getStoredProfiles();
};

// Get a profile by ID
export const getProfileById = async (id) => {
  const profiles = getStoredProfiles();
  const profile = profiles.find(p => p.id === id);
  if (!profile) {
    throw new Error('Profile not found');
  }
  return profile;
};

// Add a new profile
export const addProfile = async (profileData) => {
  const profiles = getStoredProfiles();
  const newProfile = {
    ...profileData,
    id: Date.now(), // Use timestamp as ID
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const updatedProfiles = [...profiles, newProfile];
  saveProfiles(updatedProfiles);
  return newProfile;
};

// Update a profile
export const updateProfile = async (id, profileData) => {
  const profiles = getStoredProfiles();
  const index = profiles.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Profile not found');
  }
  const updatedProfile = {
    ...profiles[index],
    ...profileData,
    updatedAt: new Date().toISOString()
  };
  profiles[index] = updatedProfile;
  saveProfiles(profiles);
  return updatedProfile;
};

// Delete a profile
export const deleteProfile = async (id) => {
  const profiles = getStoredProfiles();
  const updatedProfiles = profiles.filter(p => p.id !== id);
  saveProfiles(updatedProfiles);
  return id;
};

// Search profiles
export const searchProfiles = async (searchTerm) => {
  const profiles = getStoredProfiles();
  const searchTermLower = searchTerm.toLowerCase();
  return profiles.filter(profile => 
    profile.name.toLowerCase().includes(searchTermLower) ||
    profile.title.toLowerCase().includes(searchTermLower) ||
    profile.location.toLowerCase().includes(searchTermLower) ||
    profile.interests.some(interest => 
      interest.toLowerCase().includes(searchTermLower)
    )
  );
}; 