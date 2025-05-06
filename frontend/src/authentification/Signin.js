import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 

  const handleSignin = async () => {
    try {
        if (!username || !password) {
            setError('Veuillez entrer un identifiant et un mot de passe.');
            return;
        }

        const response = await axios.post('http://localhost:8081/auth/signin', { username, password });
        console.log('Connection réussie :', response.data);
        history('/products');
    } catch (error) {
        console.error('Connection refusée :', error.response ? error.response.data : error.message);
        setError('Identifiant ou mot de passe invaliude.');
    }
};
  return (
    <div>
      <div>
        <p>Identifiant :</p>
        <input type='text' value={username} required={true}></input>
      </div>
      <div>
        <p>Mot de passe :</p>
        <input type='text' value={password} required={true}></input>
      </div>
      <div>
        <button onClick={() => navigate(`/products/${product.id}`)}>Se connecter</button>
      </div>
    </div>
  );
}

export default App;
