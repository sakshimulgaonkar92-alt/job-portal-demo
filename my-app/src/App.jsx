import { useState } from 'react';
import Onboarding from './pages/Onboarding';
import Login from './pages/login';
import Signup from './pages/Signup';
import Dashboard from './pages/dashboard';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('onboarding'); // 'onboarding' | 'login' | 'signup'

  if (loggedIn) {
    return <Dashboard onLogout={() => setLoggedIn(false)} />;
  }

  if (page === 'login') {
    return (
      <Login
        onLogin={() => setLoggedIn(true)}
        onNavigateSignup={() => setPage('signup')}
      />
    );
  }

  if (page === 'signup') {
    return (
      <Signup
        onSignup={() => setLoggedIn(true)}
        onNavigateLogin={() => setPage('login')}
      />
    );
  }

  return (
    <Onboarding
      onLogin={() => setPage('login')}
      onRegister={() => setPage('signup')}
    />
  );
}