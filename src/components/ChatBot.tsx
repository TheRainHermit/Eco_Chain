import React, { useEffect, useState, useRef } from 'react';

// Emojis simples para el selector
const EMOJIS = ['😀', '😂', '😍', '👍', '🎉', '😎', '😢', '🤖', '❤️', '🙌'];

const ANIMATION_DURATION = 300; // ms
const STORAGE_KEY = 'chatbot-messages';

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Detecta URLs y las convierte en enlaces
function parseMessage(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) =>
    urlRegex.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">{part}</a>
    ) : (
      part
    )
  );
}

const ChatBot = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(isOpen);
  const [animate, setAnimate] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { from: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?', time: new Date(), type: 'text' }
    ];
  });
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [theme, setTheme] = useState('light');
  const [image, setImage] = useState(null);
  const messagesEndRef = useRef(null);
  const scrollRef = useRef(null);

  // Sonido de notificación
  const playSound = () => {
    const audio = new window.Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae0b6.mp3');
    audio.play();
  };

  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Animación de entrada/salida
  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else if (show) {
      setAnimate(false);
      const timeout = setTimeout(() => setShow(false), ANIMATION_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Scroll inteligente
  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, show, isBotTyping]);

  if (!show) return null;

  const handleModalClick = (e) => e.stopPropagation();

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() && !image) return;
    const now = new Date();
    let newMessages = [...messages];
    if (input.trim()) {
      newMessages.push({ from: 'user', text: input, time: now, type: 'text' });
    }
    if (image) {
      newMessages.push({ from: 'user', image, time: now, type: 'image' });
      setImage(null);
    }
    setMessages(newMessages);
    setInput('');
    setIsBotTyping(true);

    // Simula respuesta personalizada del bot
    setTimeout(() => {
      let botMsg = '¡Recibido! ¿Algo más?';
      if (input.toLowerCase().includes('hola')) botMsg = '¡Hola! ¿Cómo estás?';
      if (input.toLowerCase().includes('gracias')) botMsg = '¡De nada! 😊';
      if (input.toLowerCase().includes('adiós')) botMsg = '¡Hasta luego!';
      if (input.toLowerCase().includes('imagen') || image) botMsg = '¡Qué buena imagen!';
      setMessages(msgs => [
        ...msgs,
        { from: 'bot', text: botMsg, time: new Date(), type: 'text' }
      ]);
      setIsBotTyping(false);
      playSound();
    }, 1000);
  };

  // Enviar con Enter, salto de línea con Shift+Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  // Adjuntar imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Limpiar chat
  const handleClear = () => {
    setMessages([
      { from: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?', time: new Date(), type: 'text' }
    ]);
  };

  // Cambiar tema
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Insertar emoji
  const handleEmoji = (emoji) => {
    setInput(input + emoji);
    setShowEmoji(false);
  };

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-end justify-end"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300"></div>
      <div
        className={`
          relative m-6 w-[350px] max-w-[90vw] border border-gray-300 rounded-xl shadow-2xl p-0
          flex flex-col
          transition-all duration-300
          ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
          ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
        `}
        onClick={handleModalClick}
        style={{ height: 520, maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className={`flex justify-between items-center px-4 py-2 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-blue-600'} rounded-t-xl`}>
          <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-white'}`}>ChatBot</span>
          <div className="flex gap-2 items-center">
            <button
              onClick={toggleTheme}
              className={`text-xl ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-100'} bg-transparent border-none cursor-pointer`}
              title="Cambiar tema"
            >{theme === 'dark' ? '🌙' : '☀️'}</button>
            <button
              onClick={handleClear}
              className={`text-xl ${theme === 'dark' ? 'text-red-400' : 'text-red-200'} bg-transparent border-none cursor-pointer`}
              title="Limpiar chat"
            >🗑️</button>
            <button
              onClick={onClose}
              className={`text-2xl leading-none bg-transparent border-none cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-white'}`}
              aria-label="Cerrar chat"
            >
              ×
            </button>
          </div>
        </div>
        {/* Mensajes */}
        <div
          ref={scrollRef}
          className={`flex-1 overflow-y-auto px-4 py-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  px-3 py-2 rounded-lg max-w-[80%] text-sm relative break-words
                  ${msg.from === 'user'
                    ? `bg-blue-500 text-white rounded-br-none`
                    : `${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800'} rounded-bl-none`}
                `}
              >
                {msg.type === 'image' ? (
                  <img src={msg.image} alt="Adjunto" className="max-w-[180px] max-h-[120px] rounded mb-1" />
                ) : (
                  parseMessage(msg.text)
                )}
                <span className={`block text-[10px] mt-1 ${msg.from === 'user' ? 'text-blue-200 text-right' : theme === 'dark' ? 'text-gray-400 text-left' : 'text-gray-400 text-left'}`}>
                  {formatTime(new Date(msg.time))}
                </span>
              </div>
            </div>
          ))}
          {isBotTyping && (
            <div className="flex mb-2 justify-start">
              <div className={`px-3 py-2 rounded-lg max-w-[80%] text-sm ${theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800'} rounded-bl-none`}>
                <span className="animate-pulse">Escribiendo...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <form
          onSubmit={handleSend}
          className={`flex items-center gap-2 px-4 py-3 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} rounded-b-xl`}
        >
          <button
            type="button"
            className="text-xl"
            onClick={() => setShowEmoji(!showEmoji)}
            title="Insertar emoji"
          >😊</button>
          {showEmoji && (
            <div className="absolute bottom-20 left-4 bg-white border border-gray-200 rounded shadow p-2 flex flex-wrap gap-1 z-50">
              {EMOJIS.map((emoji, i) => (
                <button
                  key={i}
                  type="button"
                  className="text-xl hover:bg-gray-100 rounded"
                  onClick={() => handleEmoji(emoji)}
                >{emoji}</button>
              ))}
            </div>
          )}
          <label className="cursor-pointer text-xl" title="Adjuntar imagen">
            📎
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <textarea
            rows={1}
            className={`flex-1 border ${theme === 'dark' ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-300'} rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none`}
            placeholder="Escribe tu mensaje y presiona Enter..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-semibold transition ${!input.trim() && !image && 'opacity-50 cursor-not-allowed'}`}
            disabled={!input.trim() && !image}
          >
            Enviar
          </button>
        </form>
        {/* Previsualización de imagen */}
        {image && (
          <div className="absolute bottom-24 left-4 bg-white border border-gray-200 rounded shadow p-2 flex items-center gap-2 z-50">
            <img src={image} alt="Previsualización" className="max-w-[80px] max-h-[60px] rounded" />
            <button
              type="button"
              className="text-red-500 text-lg"
              onClick={() => setImage(null)}
              title="Quitar imagen"
            >✖️</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;