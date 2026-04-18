import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, MessageCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface VendorChatListProps {
  onBack: () => void;
}

interface Chat {
  id: number;
  customerName: string;
  eventType: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  avatar: string;
}

const mockChats: Chat[] = [
  {
    id: 1,
    customerName: 'Priya Sharma',
    eventType: 'Wedding',
    lastMessage: 'Yes, I would love to see the menu options for vegetarian guests.',
    timestamp: '5m ago',
    unreadCount: 3,
    isOnline: true,
    avatar: 'PS',
  },
  {
    id: 2,
    customerName: 'Rahul Mehta',
    eventType: 'Birthday Party',
    lastMessage: 'Can you arrange the decorations by 5 PM?',
    timestamp: '1h ago',
    unreadCount: 1,
    isOnline: true,
    avatar: 'RM',
  },
  {
    id: 3,
    customerName: 'Anjali Gupta',
    eventType: 'Anniversary',
    lastMessage: 'You: Sure, I can provide both DJ and live music options.',
    timestamp: '3h ago',
    unreadCount: 0,
    isOnline: false,
    avatar: 'AG',
  },
  {
    id: 4,
    customerName: 'Vikram Singh',
    eventType: 'Corporate Event',
    lastMessage: 'Thank you for the quick response!',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    avatar: 'VS',
  },
  {
    id: 5,
    customerName: 'Neha Kapoor',
    eventType: 'Engagement Party',
    lastMessage: 'You: I have sent you the package details. Please review.',
    timestamp: '2 days ago',
    unreadCount: 0,
    isOnline: false,
    avatar: 'NK',
  },
  {
    id: 6,
    customerName: 'Arjun Patel',
    eventType: 'Reception',
    lastMessage: 'What time can we schedule the tasting session?',
    timestamp: '3 days ago',
    unreadCount: 0,
    isOnline: false,
    avatar: 'AP',
  },
];

export default function VendorChatList({ onBack }: VendorChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats] = useState<Chat[]>(mockChats);

  const filteredChats = chats.filter(
    (chat) =>
      chat.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.eventType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadChats = chats.filter((chat) => chat.unreadCount > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 px-6 pt-8 pb-6 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl text-white mb-1">Customer Messages</h1>
            <p className="text-sm text-orange-100">
              {unreadChats.length > 0
                ? `${unreadChats.length} unread message${unreadChats.length > 1 ? 's' : ''}`
                : 'All caught up!'}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="pl-12 pr-4 py-6 rounded-3xl bg-white border-0 shadow-sm"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="px-6 py-4">
        {filteredChats.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-800 mb-2">No conversations found</h3>
            <p className="text-sm text-gray-500">
              {searchQuery ? 'Try a different search term' : 'Customer messages will appear here'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredChats.map((chat, index) => (
              <motion.button
                key={chat.id}
                onClick={() => {
                  // TODO: Navigate to chat conversation
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full bg-white rounded-3xl p-4 shadow-sm border border-gray-100/70 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="w-14 h-14">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-600 text-white">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 truncate">
                          {chat.customerName}
                        </h3>
                        <p className="text-xs text-gray-500">{chat.eventType}</p>
                      </div>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {chat.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-sm truncate ${
                          chat.unreadCount > 0 ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full ml-2 shrink-0">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Empty State for New Vendors */}
      {chats.length === 0 && !searchQuery && (
        <div className="px-6 py-12 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/70">
            <MessageCircle className="w-20 h-20 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl text-gray-900 mb-2">No messages yet</h2>
            <p className="text-gray-600 mb-6">
              When customers message you, conversations will appear here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
