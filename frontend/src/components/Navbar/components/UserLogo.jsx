import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Profile from "../../../assets/profile.png";
import {Card} from "./Components";
import SessionService from "../../../utils/SessionService";
import { useNavigate } from "react-router-dom";

function UserLogo({theme}){
    const username = SessionService.getUsername();
    const [isConnected, setConnected] = useState(username!==null);
    const navigate = useNavigate();

    return (
        <div className="relative group inline-block">
            <div className="flex items-center space-x-2 cursor-pointer">
            <img
                src={Profile}
                alt="User Profile"
                className={`w-9 h-9 rounded-full border-2 ${ isConnected ? "border-blue-400" : "border-gray-400"} hover:border-purple-400 transition-colors`}
                onClick={() => navigate("/profile")}
            />

                {isConnected && 
                <div className="relative group inline-block">
                <IoIosArrowDown className={`${theme.arrowColor} text-lg transition-transform group-hover:rotate-180`} />
                <Card
                    username={username}
                    setConnected={setConnected}
                    isConnected={isConnected}
                    theme={theme}
                />
                </div>}
            </div>
        </div>
    )
}

export default UserLogo;