import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Send, Paperclip, Image as ImageIcon, Smile } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface ChatInterfaceProps {
  vendor: any;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'vendor';
  timestamp: string;
}

export default function ChatInterface({ vendor, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello! Thanks for reaching out to ${vendor.name}. How can I help you today?`,
      sender: 'vendor',
      timestamp: '10:30 AM',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Simulate vendor response
      setTimeout(() => {
        const vendorResponse: Message = {
          id: messages.length + 2,
          text: "I'll get back to you shortly with all the details!",
          sender: 'vendor',
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
        };
        setMessages(prev => [...prev, vendorResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white z-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 px-6 py-4 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarFallback className="bg-orange-700 text-white">
                {vendor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-white">{vendor.name}</h2>
              <p className="text-xs text-orange-100">Online • Typically replies in minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`px-4 py-3 rounded-3xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <p className={`text-xs text-gray-500 mt-1 px-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length === 1 && (
          <div className="mt-6">
            <p className="text-xs text-gray-500 mb-3 px-2">Quick replies:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'What is your pricing?',
                'Are you available on weekends?',
                'Can I see your portfolio?',
                'Do you offer custom packages?',
              ].map((quickReply, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputMessage(quickReply);
                  }}
                  className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-gray-700 hover:border-orange-500 hover:bg-orange-50 transition-all shadow-sm"
                >
                  {quickReply}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <ImageIcon className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="rounded-3xl pr-12 border-gray-200 bg-gray-50 focus:bg-white"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Smile className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
