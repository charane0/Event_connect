import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, MessageCircle, MoreVertical } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface ChatListProps {
  onBack: () => void;
  onChatSelect: (chat: any) => void;
}

interface Chat {
  id: number;
  vendorName: string;
  vendorCategory: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  avatar: string;
}

const mockChats: Chat[] = [
  {
    id: 1,
    vendorName: 'Royal Caterers',
    vendorCategory: 'Catering',
    lastMessage: 'Thanks for your interest! I can arrange a tasting session for you.',
    timestamp: '2m ago',
    unreadCount: 2,
    isOnline: true,
    avatar: 'RC',
  },
  {
    id: 2,
    vendorName: 'Dreamland Decorators',
    vendorCategory: 'Decoration',
    lastMessage: 'I have sent you the package details. Please check and let me know.',
    timestamp: '1h ago',
    unreadCount: 0,
    isOnline: true,
    avatar: 'DD',
  },
  {
    id: 3,
    vendorName: 'Pixel Perfect Studios',
    vendorCategory: 'Photography',
    lastMessage: 'You: Can you share your portfolio?',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    avatar: 'PP',
  },
  {
    id: 4,
    vendorName: 'Harmony Events',
    vendorCategory: 'Event Planning',
    lastMessage: 'We would love to help you plan your special day!',
    timestamp: '2 days ago',
    unreadCount: 1,
    isOnline: false,
    avatar: 'HE',
  },
  {
    id: 5,
    vendorName: 'Elite DJ Services',
    vendorCategory: 'DJ & Music',
    lastMessage: 'Sure, I can provide both DJ and live music options.',
    timestamp: '3 days ago',
    unreadCount: 0,
    isOnline: false,
    avatar: 'ED',
  },
];

export default function ChatList({ onBack, onChatSelect }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats] = useState<Chat[]>(mockChats);

  const filteredChats = chats.filter(
    (chat) =>
      chat.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.vendorCategory.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-2xl text-white mb-1">Messages</h1>
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
              {searchQuery ? 'Try a different search term' : 'Start chatting with vendors'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredChats.map((chat, index) => (
              <motion.button
                key={chat.id}
                onClick={() => onChatSelect(chat)}
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
                          {chat.vendorName}
                        </h3>
                        <p className="text-xs text-gray-500">{chat.vendorCategory}</p>
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

      {/* Empty State for New Users */}
      {chats.length === 0 && !searchQuery && (
        <div className="px-6 py-12 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/70">
            <MessageCircle className="w-20 h-20 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl text-gray-900 mb-2">No messages yet</h2>
            <p className="text-gray-600 mb-6">
              When you chat with vendors, your conversations will appear here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
