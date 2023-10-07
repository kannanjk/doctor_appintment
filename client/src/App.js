import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { useSelector } from 'react-redux'
import Spinner from './Components/Spinner';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import ApplyDoctor from './Pages/ApplyDoctor';
import NotificationPage from './Pages/NotificationPage.jsx';
import Users from './Pages/Admin/Users';
import Doctors from './Pages/Admin/Doctors';
import Profile from './Pages/Doctor/Profile';
import BookingPage from './Pages/BookingPage';
import Appointments from './Pages/Appointments';
import DoctorAppointments from './Pages/Doctor/DoctorAppointments';

function App() {
  const { loading } = useSelector((state) =>state.alert)
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) :  (
          <Routes>

            <Route path='/login' element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            <Route path='/register' element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />

            <Route path='/' element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />

            <Route path='/apply-doctor' element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            } />

            <Route path='/notification' element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            } />

            <Route path='/doctors' element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            } />

            <Route path='/book-appointment/:doctorId' element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } />

            <Route path='/users' element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            } />

            <Route path='/profile/:id' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path='/appointment' element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } />

            <Route path='/doctor-appointment' element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            } />

          </Routes>
        ) }
      </BrowserRouter>
    </>
  );
}

export default App;
