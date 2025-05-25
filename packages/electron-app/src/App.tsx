import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ActivityTimer from './components/ActivityTimer';
import './App.css';

const App: React.FC = () => {
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
      <div className="app-container">
        <div className="header">
          <h1>Time Keeper</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <ActivityTimer token={token} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1 className="title">Time Keeper</h1>
      {isLogin ? <LoginForm onLogin={handleLogin} /> : <RegisterForm onLogin={handleLogin} />}
      <div className="switch-form-container">
        <button onClick={() => setIsLogin(!isLogin)} className="switch-form-button">
          {isLogin ? 'Need to register?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default App;
