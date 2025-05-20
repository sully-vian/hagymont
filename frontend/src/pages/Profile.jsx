import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserService from '../utils/UserService';
import Navbar from "../club/Navbar/Navbar";
import './Profile.css';
import userService from "../utils/UserService";

const Profile = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const [user, setUser] = useState('');
  const [isModifying, setModyfing] = useState(false);
  const [text_button, setTextButton] = useState("Modify");

  const printDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const [formPatch, setFormPatch] = useState('');

  const handleModify = () => {
    setTextButton(!isModifying ? "Save changes" : "Modify");
    setModyfing(!isModifying);
    if (isModifying){
      console.log(formPatch);
      UserService.patchRequest(`/users/${username}`, formPatch)
      .then(response => {
        setUser(response.data);
        setFormPatch('');
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', {"state":error.status});
      });
    }
  }

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
      <div className="relative z-10">
        <Navbar/>
        <div>
          <h1>Your profile</h1>
          <button onClick={handleModify}>{text_button}</button>
        </div>
        <div>
          <h2>Personal infos</h2>
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
              checked={user.gender=="M"} 
              onChange={handleChange}
            ></input> Male</label>
            <label><input type="radio" 
              name="gender" 
              value="F" 
              disabled={!isModifying} 
              checked={user.gender=="F"} 
              onChange={handleChange}
            ></input> Female</label>
            <label><input type="radio" 
              name="gender" 
              value="N" 
              disabled={!isModifying} 
              checked={user.gender=="N"} 
              onChange={handleChange}
            ></input> Neutral</label>
          </div>
          <div className="same-line">
            <p>Birthdate :</p>
            <input type="date" name="birthdate" value={user.birthdate} disabled={!isModifying}></input>
          </div>
          <div className="same-line">
            <p>Email :</p>
            <input type="text" name="email" value={user.email} disabled={!isModifying}></input>
          </div>
          <div className="same-line">
            <p>Phone number :</p>
            <input type="text" name="phone" value={user.phone} disabled={!isModifying}></input>
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
