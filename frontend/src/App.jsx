import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoutes'
import AdminDashboard from './components/AdminDashboard'
import Offers from './components/Offers'
import Bundles from './components/Bundles'
import Cosmetics from './components/Cosmetics'
import Makeup from './components/MakeUp'
import MakeupSingle from './components/Makeupsinglepage'
import PasswordResetRequest from './components/PasswordResetRequest'
import PasswordReset from './components/PasswordReset'
import About from './components/About'

function App() {
  return (
    <Navbar
      content={
        <Routes>
          {/* ✅ Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/request/password_reset" element={<PasswordResetRequest />} />
          <Route path="/password-reset/:token" element={<PasswordReset />} />

          {/* 🔐 Protected pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/makeup" element={<Makeup />} />
            <Route path="/make-up/:id" element={<MakeupSingle />} />
            <Route path="/cosmetics" element={<Cosmetics />} />
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      }
    />
  )
}

export default App
