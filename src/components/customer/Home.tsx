import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, ChevronRight, TrendingUp, MessageCircle, ChevronLeft } from 'lucide-react';
import { Input } from '../ui/input';
import VendorCard from '../common/VendorCard';
import ChatbotButton from '../common/ChatbotButton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface CustomerHomeProps {
  onNavigateSearch: () => void;
  onNavigateBookings: () => void;
  onNavigateMessages: () => void;
  onVendorSelect: (vendor: any) => void;
  onBack?: () => void;
}

const categories = [
  { name: 'Catering', icon: '🍽️', count: 234 },
  { name: 'Decoration', icon: '🎨', count: 156 },
  { name: 'Photography', icon: '📸', count: 189 },
  { name: 'Venues', icon: '🏛️', count: 98 },
  { name: 'DJ & Music', icon: '🎵', count: 87 },
  { name: 'Makeup', icon: '💄', count: 145 },
];

const vendors = [
  {
    id: 1,
    name: 'Royal Caterers',
    category: 'Catering',
    rating: 4.8,
    reviews: 245,
    price: '800/plate',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1680342638943-847f76b7b016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBldmVudHxlbnwxfHx8fDE3NjA4MDc1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isAvailable: true,
    isVerified: true,
  },
  {
    id: 2,
    name: 'Dreamland Decorators',
    category: 'Decoration',
    rating: 4.9,
    reviews: 189,
    price: '45K-80K',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1684243920725-956d93ff391a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzYwODc3ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    isAvailable: true,
    isVerified: true,
  },
  {
    id: 3,
    name: 'Pixel Perfect Studios',
    category: 'Photography',
    rating: 4.7,
    reviews: 312,
    price: '30K-60K',
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1643264623879-bb85ea39c62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoZXIlMjBjYW1lcmElMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwODg5MTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    isAvailable: false,
    isVerified: true,
  },
];

export default function CustomerHome({ onNavigateSearch, onNavigateBookings, onNavigateMessages, onVendorSelect, onBack }: CustomerHomeProps) {
  return (
    <div className="min-h-screen pb-20">
      <ChatbotButton />

      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 px-6 pt-8 pb-24 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
            )}
            <div>
              <h1 className="text-2xl text-white mb-1">Hey Venkatesh 👋</h1>
              <p className="text-sm text-orange-100">Let's plan something amazing</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onNavigateMessages}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors relative"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button 
              onClick={onNavigateBookings}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Calendar className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            onClick={onNavigateSearch}
            placeholder="Search by service, location, or budget..."
            className="pl-12 pr-4 py-6 rounded-2xl bg-white border-0 shadow-lg"
            readOnly
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-16">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl text-gray-800 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat.name}
                onClick={onNavigateSearch}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="text-sm text-gray-800 mb-1">{cat.name}</div>
                <div className="text-xs text-gray-500">{cat.count} vendors</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* AI Recommendations Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl text-gray-800">Recommended For You</h2>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <Carousel className="w-full">
              <CarouselContent>
                {vendors.map((vendor) => (
                  <CarouselItem key={vendor.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <VendorCard vendor={vendor} onClick={() => onVendorSelect(vendor)} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </div>

        {/* Top Rated */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-gray-800">Top-rated Near You</h2>
            <button 
              onClick={onNavigateSearch}
              className="text-sm text-orange-600 flex items-center gap-1"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid gap-4">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} onClick={() => onVendorSelect(vendor)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
