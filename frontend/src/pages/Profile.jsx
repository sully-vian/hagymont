import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from '../utils/UserService';
import Navbar from "../club/Navbar/Navbar";
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const [user, setUser] = useState('');
  const [isModifying, setModyfing] = useState(false);
  const [text_button, setTextButton] = useState("Modify");
  const [error, setError] = useState(null);

  const printDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const [formPatch, setFormPatch] = useState('');

  const handleModify = () => {
    setTextButton(!isModifying ? "Save changes" : "Modify");
    setModyfing(!isModifying);
    if (isModifying && formPatch!==''){
      console.log(formPatch);
      UserService.patchRequest(`/users/${username}`, formPatch)
      .then(response => {
        setUser(response.data);
        setFormPatch('');
        setTextButton(!isModifying ? "Save changes" : "Modify");
        setModyfing(!isModifying);
        setError(null);
      })
      .catch(error => {
        //Restore user infos
        UserService.getRequest(`/users/${username}`)
        .then(response => {
          setUser(response.data);
          setFormPatch('');
        })
        .catch(error => {
          //Gestion erreur get user
          console.error('Erreur détectée :', error);
          navigate('/error', {"state":error.status});
        });
        //Gestion erreur update
        console.error('Erreur détectée :', error);
        if (error.status==404){
          navigate("/error");
        }else{
          setError(error.response.data || 'Update failed. Please try again.');
        }
      });
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer); // Nettoyage si error change avant la fin du timer
    }
  }, [error]);

  useEffect(() => {
    if (username==null){
      navigate("/login");
    }else{
      UserService.getRequest(`/users/${username}`)
      .then(response => {
        setUser(response.data);
        setFormPatch('');
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', {"state":error.status});
      });
    }
  }, []); 

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value;

    //Update local variable user
    setUser({
      ...user,
      [e.target.name]: value
    });

    //Add updated field to patch variable
    setFormPatch({
      ...formPatch,
      [e.target.name]: value
    });
  };

  
  return (
    <div className="relative min-h-screen">
      <div className="relative z-50">
        <Navbar/>
        <div>
          <h1>Your profile</h1>
        </div>
        <div>
          <div className="center flex gap-40 items-center ml-4 mb-6">
            <h2>Personal infos</h2>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={handleModify}>{text_button}</button>
          </div>
          
          {error && (
          <div className="alert alert-danger mb-3">{error}</div>
          )}
          <div className="same-line">
            <p>Username :</p>
            {/* Username cannot be changed */}
            <input type="text" name="username"  value={user.username} onChange={handleChange} disabled={true}></input>
          </div>
          <div className="same-line">
            <p>Firstname :</p>
            <input type="text" name="firstname"  value={user.firstname} onChange={handleChange} disabled={!isModifying}></input>
          </div>
          <div className="same-line">
            <p>Lastname :</p>
            <input type="text" name="secondname" value={user.secondname} onChange={handleChange} disabled={!isModifying}></input>
          </div>
          <div className="same-line">
            <p>Gender :</p>
            <label><input type="radio" 
              name="gender" 
              value="M" 
              disabled={!isModifying} 
              checked={user.gender==="M"} 
              onChange={handleChange}
            ></input> Male</label>
            <label><input type="radio" 
              name="gender" 
              value="F" 
              disabled={!isModifying} 
              checked={user.gender==="F"} 
              onChange={handleChange}
            ></input> Female</label>
            <label><input type="radio" 
              name="gender" 
              value="N" 
              disabled={!isModifying} 
              checked={user.gender==="N"} 
              onChange={handleChange}
            ></input> Neutral</label>
          </div>
          <div className="same-line">
            <p>Birthdate :</p>
            <input type="date" name="birthdate" value={user.birthdate} onChange={handleChange} disabled={!isModifying}></input>
          </div>
          <div className="same-line">
            <p>Email :</p>
            <input type="text" name="email" value={user.email} onChange={handleChange} disabled={!isModifying}></input>
          </div>
          <div className="same-line">
            <p>Phone number :</p>
            <input type="text" name="phone" value={user.phone} onChange={handleChange} disabled={!isModifying}></input>
          </div>
          <div className="same-line">
            <p>Subscription type :</p>
            <p> {user.type}</p>
            {/*Si on veut changer il faut le faire sur une autre page donc pas modifiable*/}
          </div>
          <div className="same-line">
            <p>Subscription start :</p>
            <p>{printDate(user.cardStart)}</p>
          </div>
          <div className="same-line">
            <p>Subscription end :</p>
            <p>{printDate(user.cardEnd)}</p>
            {/* bouton renouveler l'abonnement */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
