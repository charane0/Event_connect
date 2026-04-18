import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, MapPin, IndianRupee, ArrowLeft, Map } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import VendorCard from '../common/VendorCard';
import { Badge } from '../ui/badge';

interface SearchFilterProps {
  onBack: () => void;
  onVendorSelect: (vendor: any) => void;
}

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
  {
    id: 4,
    name: 'Grand Venues',
    category: 'Venues',
    rating: 4.6,
    reviews: 156,
    price: '1L-2.5L',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1521543387600-c745f8e83d77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBoYWxsfGVufDF8fHx8MTc2MDg5Njg3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    isAvailable: true,
    isVerified: true,
  },
];

export default function SearchFilter({ onBack, onVendorSelect }: SearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [budget, setBudget] = useState([50000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 px-6 pt-8 pb-6 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl text-white">Search Vendors</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by service, location, or budget..."
            className="pl-12 pr-4 py-6 rounded-2xl bg-white border-0 shadow-lg"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="bg-white/20 border-white/40 text-white hover:bg-white/30 rounded-xl"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Badge className="bg-white/20 text-white border-white/40">Catering</Badge>
          <Badge className="bg-white/20 text-white border-white/40">₹0-1L</Badge>
          <Badge className="bg-white/20 text-white border-white/40">Mumbai</Badge>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          className="bg-white px-6 py-4 shadow-md space-y-4"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <div>
            <label className="block text-gray-700 mb-2">Service Type</label>
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="catering">Catering</SelectItem>
                <SelectItem value="decoration">Decoration</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="venues">Venues</SelectItem>
                <SelectItem value="dj">DJ & Music</SelectItem>
                <SelectItem value="makeup">Makeup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input placeholder="Enter city or area" className="pl-11 rounded-xl" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-700">Budget</label>
              <span className="text-sm text-orange-600">₹{budget[0].toLocaleString()}</span>
            </div>
            <Slider
              value={budget}
              onValueChange={setBudget}
              max={200000}
              step={5000}
              className="mb-2"
            />
          </div>

          <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-xl">
            Apply Filters
          </Button>
        </motion.div>
      )}

      {/* Sort & View Options */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 rounded-xl border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="rounded-xl"
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
        >
          <Map className="w-4 h-4" />
        </Button>
      </div>

      {/* Results */}
      <div className="px-6 py-4">
        <p className="text-sm text-gray-600 mb-4">Found {vendors.length} vendors</p>
        
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} onClick={() => onVendorSelect(vendor)} />
          ))}
        </div>

        {/* Empty State */}
        {vendors.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-gray-800 mb-2">No vendors found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters</p>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setShowFilters(true)}
            >
              Update Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
