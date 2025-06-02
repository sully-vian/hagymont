import { FaDumbbell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SessionService from "../../../utils/SessionService";
import { useState } from "react";


export function Logo(){
    return (
        <div className="flex items-center gap-2">
            <FaDumbbell className="text-3xl text-primary animate-bounce" />
            <p className="text-3xl lg:text-4xl font-bold text-black">
                Ha
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Gym
                </span>
                ont
            </p>
        </div>
    )
};

export function ItemBar({label, page}){
    const navigate = useNavigate();
    return (
        <li
            className="hover:border-b-2 border-primary uppercase cursor-pointer text-base font-medium"
            onClick={() => navigate(page)}
        >
            {label}
        </li>
    );
};

function ButtonCard({label, onClick, colors}) {
    return (
    <button
        onClick={onClick}
        className={`block w-full text-left ${colors.base} uppercase font-semibold mb-2 ${colors.hover} transition-colors`}
        >
        {label}
    </button>
    );
};

export function Card({username, setConnected, isConnected, theme}) {
    const navigate = useNavigate();
  return (
    <div>
        { isConnected ? 
        (<div className={`w-48 ${theme.bgColor} shadow-lg border ${theme.borderColor} rounded-lg p-3 absolute right-0 mt-2 hidden group-hover:block transition-opacity z-50`}>
            <p className={`text-sm font-semibold ${theme.textColor} mb-4`}>Hi <span className="capitalize">{username}</span>!</p>
            <ButtonCard
                label="Your reservations"
                onClick={()=> navigate("/calendar")}
                colors={{base : theme.buttonColor, hover : theme.buttonColorHover}}
            />
            <ButtonCard
                label="Your orders"
                onClick={() => navigate("/orders")}
                colors={{base : theme.buttonColor, hover :  theme.buttonColorHover}}
            />
            <ButtonCard
                label="Your cart"
                onClick={()=> navigate("/basket")}
                colors={{base : theme.buttonColor, hover :  theme.buttonColorHover}}
            />
            <ButtonCard
                label="Log out"
                onClick={() => {
                    SessionService.clearSession();
                    setConnected(false);
                }}
                colors={{base : "text-red-400", hover : "hover:text-red-700"}}
            />
        </div>)
        : (<></>)}
        
    </div>
    );
}
