import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload(); 
  };

  if (!token) return null;

  return (
    <nav style={{ 
      display: 'flex', 
      gap: '20px', 
      padding: '15px 20px', 
      borderBottom: '1px solid #ddd',
      alignItems: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
        📖 Журнал (Головна)
      </Link>
      
      <Link to="/workouts" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
        🏋️ Тренування
      </Link>

      <button 
        onClick={handleLogout} 
        style={{ 
          marginLeft: 'auto', 
          padding: '8px 16px', 
          backgroundColor: '#ff4d4f', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Вийти
      </button>
    </nav>
  );
};

export default Navbar;