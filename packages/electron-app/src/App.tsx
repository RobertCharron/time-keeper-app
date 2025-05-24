import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ActivityTimer from './components/ActivityTimer';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (newToken: string) => {
    localStorage.setItem('access_token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
  };

  if (token) {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0 }}>Time Keeper</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
        <ActivityTimer token={token} />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Time Keeper</h1>
      {isLogin ? <LoginForm onLogin={handleLogin} /> : <RegisterForm onLogin={handleLogin} />}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isLogin ? 'Need to register?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
}

export default App; 