import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pilatesVideo from '../assets/video/surfing.mp4';
import Navbar from "../club/Navbar/Navbar";
import UserService from '../utils/UserService';

const Profile = () => {
    const navigate = useNavigate();
    const username = sessionStorage.getItem("username");
    const [user, setUser] = useState({});
    const [isModifying, setModyfing] = useState(false);
    const [text_button, setTextButton] = useState("Modify");
    const [formPatch, setFormPatch] = useState('');
    const [error, setError] = useState('');

    const printDate = (date) => {
        return new Date(date).toLocaleDateString('fr-FR');
    };


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

        setUser({
           ...user,
            [e.target.name]: value
        });

        setFormPatch({
           ...formPatch,
            [e.target.name]: value
        });
    };

    return (
        <>
            {/* 视频背景，固定铺满全屏 */}
            <video 
                autoPlay 
                loop 
                muted 
                className="fixed top-0 left-0 w-full h-full object-cover z-0"
                src={pilatesVideo}
                type="video/mp4"
            />

            {/* 主体容器，flex布局垂直排列，撑满屏幕 */}
            <div className="relative z-10 min-h-screen flex flex-col justify-between max-w-4xl mx-auto my-10 bg-white bg-opacity-50 rounded-lg shadow-lg p-8">

                <Navbar />

                {/* 个人信息内容区，flex-grow撑满剩余空间 */}
                <div className="flex-grow overflow-auto">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Your profile</h1>

                    <div>
                        <h2 className="text-2xl font-semibold mb-5 text-gray-700">Personal infos</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <label className="w-1/3 font-semibold text-gray-700">Username :</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={user.username || ''} 
                                    disabled 
                                    className="ml-2 flex-1 border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/3 font-semibold text-gray-700">Firstname :</label>
                                <input 
                                    type="text" 
                                    name="firstname" 
                                    value={user.firstname || ''} 
                                    onChange={handleChange} 
                                    disabled={!isModifying} 
                                    className={`ml-2 flex-1 border rounded-md p-2 ${isModifying ? 'border-blue-500' : 'border-gray-300 bg-gray-100'}`}
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/3 font-semibold text-gray-700">Lastname :</label>
                                <input 
                                    type="text" 
                                    name="secondname" 
                                    value={user.secondname || ''} 
                                    onChange={handleChange} 
                                    disabled={!isModifying} 
                                    className={`ml-2 flex-1 border rounded-md p-2 ${isModifying ? 'border-blue-500' : 'border-gray-300 bg-gray-100'}`}
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="w-1/3 font-semibold text-gray-700">Gender :</span>
                                {["M", "F", "N"].map(g => (
                                    <label key={g} className="flex items-center space-x-1">
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            value={g} 
                                            disabled={!isModifying} 
                                            checked={user.gender === g} 
                                            onChange={handleChange} 
                                            className="cursor-pointer"
                                        />
                                        <span>{g === "M" ? "Male" : g === "F" ? "Female" : "Neutral"}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/3 font-semibold text-gray-700">Birthdate :</label>
                                <input 
                                    type="date" 
                                    name="birthdate" 
                                    value={user.birthdate ? user.birthdate.split('T')[0] : ''} 
                                    onChange={handleChange}
                                    disabled={!isModifying} 
                                    className={`ml-2 flex-1 border rounded-md p-2 ${isModifying ? 'border-blue-500' : 'border-gray-300 bg-gray-100'}`}
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/3 font-semibold text-gray-700">Email :</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={user.email || ''} 
                                    onChange={handleChange} 
                                    disabled={!isModifying} 
                                    className={`ml-2 flex-1 border rounded-md p-2 ${isModifying ? 'border-blue-500' : 'border-gray-300 bg-gray-100'}`}
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="w-1/3 font-semibold text-gray-700">Phone number :</label>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    value={user.phone || ''} 
                                    onChange={handleChange} 
                                    disabled={!isModifying} 
                                    className={`ml-2 flex-1 border rounded-md p-2 ${isModifying ? 'border-blue-500' : 'border-gray-300 bg-gray-100'}`}
                                />
                            </div>
                            <div className="flex items-center">
                                <span className="w-1/3 font-semibold text-gray-700">Subscription type :</span>
                                <span className="ml-2 text-gray-800">{user.type || '-'}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-1/3 font-semibold text-gray-700">Subscription start :</span>
                                <span className="ml-2 text-gray-800">{user.cardStart ? printDate(user.cardStart) : '-'}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-1/3 font-semibold text-gray-700">Subscription end :</span>
                                <span className="ml-2 text-gray-800">{user.cardEnd ? printDate(user.cardEnd) : '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 固定在底部的按钮区域 */}
                <div className="mt-6 pt-4 border-t border-gray-300">
                    <button
                        onClick={handleModify}
                        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 w-full"
                    >
                        {text_button}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Profile;
