import { motion } from 'motion/react';
import { Star, MapPin, IndianRupee } from 'lucide-react';
import { Badge } from '../ui/badge';

interface VendorCardProps {
  vendor: {
    id: number;
    name: string;
    category: string;
    rating: number;
    reviews: number;
    price: string;
    location: string;
    image: string;
    isAvailable: boolean;
    isVerified?: boolean;
  };
  onClick: () => void;
}

export default function VendorCard({ vendor, onClick }: VendorCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer border border-gray-100"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={vendor.isAvailable ? 'bg-green-500' : 'bg-gray-500'}>
            {vendor.isAvailable ? 'Available' : 'Booked'}
          </Badge>
        </div>
        {/* Verified Badge */}
        {vendor.isVerified && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-blue-500">
              ✓ Verified
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">{vendor.name}</h3>
            <p className="text-sm text-gray-500">{vendor.category}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-sm text-gray-900">{vendor.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({vendor.reviews} reviews)</span>
        </div>

        {/* Location & Price */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{vendor.location}</span>
          </div>
          <div className="flex items-center gap-1 text-orange-600">
            <IndianRupee className="w-4 h-4" />
            <span>{vendor.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
