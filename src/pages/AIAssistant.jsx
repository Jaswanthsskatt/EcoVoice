import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User } from 'lucide-react';

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am EcoBuddy, your AI Sustainability Assistant. How can I help you speak, act, or heal the Earth today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const getBotResponse = (input) => {
    const text = input.toLowerCase();
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return "Hi there! Green greetings from EcoBuddy. How can I assist you with sustainable living or community actions today?";
    }
    if (text.includes('climate') || text.includes('map') || text.includes('weather')) {
      return "You can check our interactive Climate Map to view real-time ecological conditions, temperature changes, and wind datasets. Simply click on the map or search for any location!";
    }
    if (text.includes('donate') || text.includes('fund') || text.includes('support')) {
      return "Thank you for wanting to make a difference! You can head over to our Donate page to support Sapling planting, Riverbed cleanups, and local air quality monitoring.";
    }
    if (text.includes('report') || text.includes('issue') || text.includes('pollution')) {
      return "If you notice environmental hazards like illegal dumping, air pollution, or deforestation in your area, please use our Report Issues page to notify local bodies.";
    }
    if (text.includes('learn') || text.includes('academy') || text.includes('article') || text.includes('knowledge')) {
      return "We have a full Academy page with sustainable living guides, recycling tips, and environmental awareness resources. Click on 'Academy' to get started!";
    }
    return "That's an interesting question! We are constantly working on expanding our ecological database. To support local conservation, try planting native seeds, reducing plastic waste, or volunteering in our community events.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputVal;
    setInputVal('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = getBotResponse(currentInput);
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[480px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col mb-4 overflow-hidden transition-all duration-300 animate-scale-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-800 to-emerald-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-green-300" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-green-800 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm">EcoBuddy</h4>
                <p className="text-[10px] text-green-200/80 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Online AI Advisor
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-2 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.sender === 'user' 
                    ? 'bg-green-100 border-green-200 text-green-700' 
                    : 'bg-emerald-800 border-emerald-900 text-white'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message bubble */}
                <div className="space-y-0.5">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-green-700 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-150 rounded-tl-none shadow-xs'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-400 block px-1 text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {isTyping && (
              <div className="flex gap-2 max-w-[85%]">
                <div className="w-7 h-7 bg-emerald-800 border border-emerald-900 rounded-full flex items-center justify-center shrink-0 text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-gray-150 p-3 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white flex gap-2">
            <input 
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask me about Climate Map, Donate..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-colors"
            />
            <button 
              type="submit"
              className="p-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl transition-colors shadow-md shadow-green-700/10 cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-green-700 hover:bg-green-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer relative group border-2 border-white/20"
        aria-label="Toggle chat"
      >
        {isOpen ? <X className="w-6 h-6 animate-fadeIn" /> : <Bot className="w-6 h-6 animate-fadeIn" />}
        
        {/* Subtle tooltip */}
        {!isOpen && (
          <span className="absolute right-16 scale-0 group-hover:scale-100 bg-gray-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-md transition-all duration-200 font-semibold pointer-events-none">
            Chat with EcoBuddy 🌍
          </span>
        )}
      </button>

      {/* Keyframe animation inline style */}
      <style>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scale-up {
          animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default AIAssistant;
