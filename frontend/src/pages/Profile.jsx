import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from '../utils/UserService';
import Navbar from "../club/Navbar/Navbar";

const Profile = () => {
  const navigate = useNavigate;
  const username = sessionStorage.getItem("username");
  const [user, setUser] = useState('');

  useEffect(() => {
    if (username===null){
      navigate("/login");
    }else{
      UserService.getRequest(`/users/${username}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', {"state":error.status});
      });
    }
  }, []); 

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar/>
        <div>
          <h1>Your profile</h1>
          <button>Modify</button>
        </div>
        <div>
          <h2>Personal infos</h2>
          <p>Username : {user.username}</p>
          <p>Firstname : {user.firstname}</p>
          <p>Lastname : {user.secondname}</p>
          <p>Gender : {user.gender}</p>
          <p>Type : {user.type}</p>
          <p>Birthdate : {user.birthdate}</p>
          <p>Phone number : {user.phone}</p>
          <p>Email : {user.email}</p>
          <p>Subscription start : {user.cardStart}</p>
          <p>Subscription end : {user.cardEnd}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
