import { Route, Routes } from 'react-router'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { ProfilePage } from './pages/ProfilePage'
import { NavigationBar } from './components/NavigationBar'
import { ProtectedRoute } from './components/ProtectedRoute'
import { BookingPage } from './pages/BookingPage'



function App() {
  return (
    <div className='min-h-screen bg-cream text-gray-800 transition-opacity duration-700 pt-10'>
      <NavigationBar />
      <div className='container mx-auto px-4 py-6'>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>   
            <Route path="/home" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/book/:serviceId" element={<BookingPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
