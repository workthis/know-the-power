import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import WorkoutsPage from './pages/WorkoutsPage';
import Navbar from './components/Navbar';


// Додано 3 сторінки
function App() {
  const isAuth = !!localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/" 
            element={isAuth ? <DashboardPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/workouts" 
            element={isAuth ? <WorkoutsPage /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;