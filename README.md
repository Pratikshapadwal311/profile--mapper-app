# Profile Mapper

A modern web application that allows users to view and explore profiles with their locations on an interactive map. Built with React and Material-UI.

## Features

- View profiles with detailed information
- Interactive Google Maps integration
- Search and filter profiles
- Admin dashboard for profile management
- Responsive design for all devices
- Modern and intuitive user interface

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Maps API key

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd profile-mapper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Google Maps API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
profile-mapper/
├── public/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.js
│   │       └── Footer.js
│   │   
│   │   └── pages/
│   │       ├── Home.js
│   │       ├── ProfileList.js
│   │       ├── ProfileDetail.js
│   │       ├── AdminDashboard.js
│   │       └── NotFound.js
│   │   
│   │   └── App.js
│   │   
│   └── index.js
├── .env
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Technologies Used

- React
- Material-UI
- React Router
- Google Maps JavaScript API
- Formik & Yup
- Axios

## Features in Detail

### Profile Display
- View detailed profile information
- Interactive Google Maps integration showing profile location
- Responsive profile cards with images and information
- Search and filter capabilities

### Interactive Map
- Google Maps integration
- Marker clustering for multiple profiles
- Interactive markers with profile information
- Custom map controls and styling

### Admin Dashboard
- Add, edit, and delete profiles
- Form validation
- Real-time updates
- User-friendly interface

### Search and Filter
- Search profiles by name, location, or interests
- Filter profiles by various criteria
- Real-time search results
- Responsive search interface

### Responsive Design
- Mobile-first approach
- Responsive layout for all screen sizes
- Touch-friendly interface
- Optimized performance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Maps Platform for the mapping functionality
- Material-UI for the component library
- Create React App for the project setup
