import { useState } from 'react';
import apiService from "../utils/APIService"



function Closed({setOpened}){
    return (
        <div className="fixed right-4 bottom-4">
            <button
                onClick={() => setOpened(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600"
                >
                💬
            </button>
        </div>
        
    )
};

function Open({setOpened}){
    const [request, setRequest] = useState("");
    const [response, setResponse] = useState("Hi ! I'm an assistant, ask me anything.");

    const handleWrite = (e) => {
        setRequest(e.target.value);
    }

    const handleSubmit = () => {
        apiService.postRequest("/chat", {request})
        .then(response => {
            setResponse(response.data);
        })
        .catch(error => {
            setResponse("Sorry, I'm having some troubles now, ask me later.");
        });
    }

    return (
        <div className="bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col overflow-hidden">
          {/* Header avec bouton de fermeture */}
          <div className="flex justify-between items-center px-3 py-2 bg-blue-500 text-white">
            <span className="text-sm font-semibold">ChatBot</span>
            <button onClick={() => setOpened(false)} className="text-white hover:text-gray-200 text-lg font-bold">
              &times;
            </button>
          </div>

          {/* Contenu du bot */}
          <div className="flex flex-col gap-2 p-2 overflow-y-auto h-48">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2" /> {/* avatar bot */}
              <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-800">
                <p>{response}</p>
              </div>
            </div>
          </div>

          {/* Entrée utilisateur */}
          <div className="flex items-center p-2 border-t border-gray-200">
            <input
              type="text"
              onChange={handleWrite}
              onClick={() => setRequest("")}
              value={request}
              placeholder="Your question..."
              className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <button
              onClick={handleSubmit}
              className="ml-2 bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600"
            >
              ➤
            </button>
          </div>
        </div>
    );

};

function ChatBot() {
const [opened, setOpened] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 w-1/6 min-w-[250px] max-w-sm">
        {opened ? 
            <Open setOpened={setOpened} />
        : <Closed setOpened={setOpened} />
        }
    </div>
  );
}

export default ChatBot ;
