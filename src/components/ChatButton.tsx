import React from "react";
import { BotMessageSquare } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
    >
      <BotMessageSquare size={24} />
      <span>Chat with us</span>
    </button>
  );
};

export default ChatButton;
