import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, MapPin, Phone, Mail, CheckCircle, MessageCircle, Calendar, Share2, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ChatInterface from './ChatInterface';

interface VendorDetailProps {
  vendor: any;
  onBack: () => void;
  onBookNow: () => void;
}

const gallery = [
  'https://images.unsplash.com/photo-1680342638943-847f76b7b016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBldmVudHxlbnwxfHx8fDE3NjA4MDc1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1684243920725-956d93ff391a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzYwODc3ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1521543387600-c745f8e83d77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBoYWxsfGVufDF8fHx8MTc2MDg5Njg3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1759911233711-06366f2c48c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGRlY29yYXRpb24lMjBzdGFnZXxlbnwxfHx8fDE3NjA4OTY4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
];

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: 'PS',
    rating: 5,
    date: '2 days ago',
    comment: 'Absolutely amazing service! They made our wedding unforgettable. Highly recommended!',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    avatar: 'RM',
    rating: 4,
    date: '1 week ago',
    comment: 'Great experience overall. Professional team and timely delivery.',
  },
  {
    id: 3,
    name: 'Anjali Gupta',
    avatar: 'AG',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Best vendor in town! Worth every penny. Thank you for making our event special.',
  },
];

export default function VendorDetail({ vendor, onBack, onBookNow }: VendorDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* Chat Interface */}
      <AnimatePresence>
        {showChat && (
          <ChatInterface vendor={vendor} onClose={() => setShowChat(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen pb-24">
      {/* Hero Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Header */}
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/40 to-transparent">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
              </button>
              <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <Share2 className="w-5 h-5 text-gray-800" />
              </button>
            </div>
          </div>
        </div>

        {/* Verified Badge */}
        {vendor.isVerified && (
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-blue-500 text-white px-3 py-1">
              <CheckCircle className="w-4 h-4 mr-1" />
              Verified Vendor
            </Badge>
          </div>
        )}
      </div>

      {/* Vendor Info */}
      <div className="px-6 py-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl text-gray-900 mb-2">{vendor.name}</h1>
            <p className="text-gray-600 mb-3">{vendor.category}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-lg">
                <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                <span className="text-gray-900">{vendor.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({vendor.reviews} reviews)</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <MapPin className="w-5 h-5" />
              <span>{vendor.location}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-2xl text-orange-600">₹{vendor.price}</span>
              <Badge className={vendor.isAvailable ? 'bg-green-500' : 'bg-gray-500'}>
                {vendor.isAvailable ? 'Available' : 'Booked'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            variant="outline"
            className="rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowChat(true)}
            className="rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="availability">Available</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="text-gray-800 mb-2">About</h3>
              <p className="text-gray-600">
                We are a premium {vendor.category.toLowerCase()} service provider with over 10 years of experience. 
                Our team is dedicated to making your event memorable with exceptional quality and professional service.
              </p>
            </div>

            <div>
              <h3 className="text-gray-800 mb-3">Services Offered</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Premium Packages</Badge>
                <Badge variant="outline">Custom Themes</Badge>
                <Badge variant="outline">On-site Support</Badge>
                <Badge variant="outline">Consultation</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-gray-800 mb-3">Key Features</h3>
              <div className="space-y-2">
                {['Professional Team', 'Quality Guarantee', 'Timely Delivery', 'Affordable Pricing'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="relative aspect-square rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar>
                    <AvatarFallback className="bg-orange-500 text-white">
                      {review.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-gray-900">{review.name}</h4>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="availability">
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-gray-800 mb-2">Check Availability</h3>
              <p className="text-gray-600 mb-6">
                Select your preferred date to check if this vendor is available
              </p>
              <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-xl">
                <Calendar className="w-4 h-4 mr-2" />
                Select Date
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-10">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-xl text-gray-900">₹{vendor.price}</p>
          </div>
          <Button
            onClick={onBookNow}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 px-8 py-6 rounded-2xl shadow-lg"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
