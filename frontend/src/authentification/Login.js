import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../utils/UserService';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        if (!username || !password) {
            setError('Veuillez entrer un identifiant et un mot de passe.');
            return;
        }

        const response = userService.loginRequest('/auth/login', { username, password });
        console.log('Connection réussie :', (await response).data.message);
        console.log('Token :', (await response).data.jwt);
        sessionStorage.setItem('token', (await response).data.jwt);
        sessionStorage.setItem('username', username);
        navigate('/products');
    } catch (error) {
        console.error('Connection refusée :', error.response ? error.response.data : error.message);
        setError('Identifiant ou mot de passe invaliude.');
    }
    
  };
  return (
    <div>
      <div>
        <p>Identifiant :</p>
        <input type='text' value={username} required={true} onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div>
        <p>Mot de passe :</p>
        <input type='text' value={password} required={true} onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      {error && <p className="text-danger">{error}</p>} {/* Render error message if exists */}
      <div>
        <button onClick={handleLogin}>Se connecter</button>
      </div>
    </div>
  );
}

export default Login;
