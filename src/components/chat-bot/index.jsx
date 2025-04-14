import { FaTimes, FaComment, FaTelegramPlane } from 'react-icons/fa';

function Chatbot({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed sm:bottom-8 md:bottom-16 right-5 w-80 h-96 bg-gray-200 shadow-lg rounded-lg border border-gray-300 flex flex-col z-50">
      <div className="bg-[#2C2C47] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
        <span className="flex items-center gap-2 font-semibold">
          Chat with us
          <FaComment className="text-xl text-white" />
        </span>
        <FaTimes className="cursor-pointer hover:text-red-500" onClick={onClose} title="Close chat window" />
      </div>

      <div className="flex-1 p-4 overflow-y-auto text-[#2C2C47] bg-white">
        <p className="p-2 bg-gray-200 rounded-lg w-fit">Hello! How can I help you?</p>
      </div>

      <div className="p-2 border-t flex">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-2 py-1 border rounded-lg focus:outline-none"
        />
        <button className="ml-2 bg-[#2C2C47] text-white px-3 py-1 rounded-lg transition duration-300 ease-in-out hover:scale-105 active:scale-95">
          <FaTelegramPlane className="text-lg" />
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
