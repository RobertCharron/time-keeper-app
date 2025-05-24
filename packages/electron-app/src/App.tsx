import { FC, useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App: FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem('access_token', token);
    setToken(token);
  };

  const handleRegister = (token: string) => {
    localStorage.setItem('access_token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Time Keeper App</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Welcome to your time tracking application!</p>
      {token ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2 style={{ color: '#333' }}>Logged In</h2>
          <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
        </div>
      ) : (
        <>
          <button onClick={() => setIsLogin(!isLogin)} style={{ display: 'block', margin: '20px auto', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Switch to {isLogin ? 'Registration' : 'Login'}
          </button>
          {isLogin ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <RegisterForm onRegister={handleRegister} />
          )}
        </>
      )}
    </div>
  );
};

export default App; 