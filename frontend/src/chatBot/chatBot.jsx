import { useState } from 'react';
import catImg from '../assets/cat.png';
import apiService from "../utils/APIService";

function Closed({ setOpened }) {
  return (
    <div className="fixed right-4 bottom-4">
      <button
        onClick={() => setOpened(true)}
        className="relative group inline-block bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 w-14 h-14 flex items-center justify-center text-2xl group inline-block"
        aria-label="Open Chat"
      >
        🐱
        <span
          className="absolute -top-2 left-1 w-0 h-0 border-l-transparent border-r-transparent border-b-blue-500 group-hover:border-b-blue-600"
          style={{
            borderLeftWidth: "15px",
            borderRightWidth: "15px",
            borderBottomWidth: "21px",
            borderStyle: "solid",
          }}
        ></span>
        <span
          className="absolute -top-2 right-1 w-0 h-0 border-l-transparent border-r-transparent border-b-blue-500 group-hover:border-b-blue-600"
          style={{
            borderLeftWidth: "15px",
            borderRightWidth: "15px",
            borderBottomWidth: "21px",
            borderStyle: "solid",
          }}
        ></span>
      </button>
    </div>
  );
}

function Open({ setOpened }) {
  const [request, setRequest] = useState("");
  const [response, setResponse] = useState("Hi! I’m your assistant cat Kiki 😼. Ask me anything.");
  const [loading, setLoading] = useState(false);

  const handleWrite = (e) => setRequest(e.target.value);

  //Enter: send message, Shift+Enter: new line
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!request.trim()) return;

    setLoading(true);
    apiService.postRequest("/chat", { request })
      .then(res => setResponse(res.data))
      .catch(() => setResponse("Sorry, I'm having some troubles now🙀,ssk me later."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative bg-white border border-gray-300 shadow-lg rounded-xl flex flex-col overflow-hidden w-64 min-h-[300px] animate-fade-in">
      <div className="flex justify-between items-center px-4 py-2 bg-blue-500 text-white rounded-t-xl">
        <span className="text-sm font-semibold flex items-center">
          🐾 ChatCat
        </span>
        <button onClick={() => setOpened(false)} className="text-white hover:text-gray-200 text-lg font-bold">
          &times;
        </button>
      </div>

      <div className="flex items-start p-3 border-b border-gray-200">
        <img
          src={catImg}
          alt="Cat Avatar"
          className="w-12 h-12 rounded-full mr-3 object-cover"
        />
        <div className="bg-gray-100 rounded-lg p-3 max-w-xs max-h-40 overflow-y-auto transition-all duration-300 ease-in-out">
          <p className="text-gray-800 text-sm whitespace-pre-wrap break-words">
            {loading ? "Kiki is typing... 🐾🐾🐾" : response}
          </p>
        </div>
      </div>

      <div className="flex items-center p-3 border-t border-gray-200">
        <textarea
          rows={1}
          onChange={handleWrite}
          onKeyDown={handleKeyDown}
          value={request}
          placeholder="Your question..."
          className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="ml-1 bg-blue-500 text-white text-lg px-3 py-2 rounded-md hover:bg-blue-600 transition-transform active:scale-95"
          aria-label="Send"
        >
          😸
        </button>
      </div>
    </div>
  );
}

function ChatBot() {
  const [opened, setOpened] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 w-64 min-w-[250px] max-w-sm z-50">
      {opened ? <Open setOpened={setOpened} /> : <Closed setOpened={setOpened} />}
    </div>
  );
}

export default ChatBot;
