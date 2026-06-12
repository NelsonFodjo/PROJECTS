import './App.css';
import { useState } from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import HomePage from './HomePage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => setLoggedIn(true)
  const logout = () => setLoggedIn(false)

  return (
    <div>
      {loggedIn ? (
        <div>
          <HomePage />
          <LogoutButton logout={logout} />

        </div>
      ) : 
      (
        <LoginButton login={login} />
      )}

    </div>
  );
}

export default App;