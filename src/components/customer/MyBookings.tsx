import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, IndianRupee, Star, MessageCircle, Phone, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';

interface MyBookingsProps {
  onBack: () => void;
}

const bookings = [
  {
    id: 1,
    vendorName: 'Royal Caterers',
    category: 'Catering',
    image: 'https://images.unsplash.com/photo-1680342638943-847f76b7b016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBldmVudHxlbnwxfHx8fDE3NjA4MDc1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'Nov 15, 2025',
    time: '6:00 PM',
    guests: 100,
    price: 54000,
    status: 'confirmed',
    location: 'Mumbai',
    bookingId: 'SWT45621',
  },
  {
    id: 2,
    vendorName: 'Dreamland Decorators',
    category: 'Decoration',
    image: 'https://images.unsplash.com/photo-1684243920725-956d93ff391a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzYwODc3ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'Dec 5, 2025',
    time: '5:00 PM',
    guests: 150,
    price: 75000,
    status: 'pending',
    location: 'Delhi',
    bookingId: 'SWT45622',
  },
];

const pastBookings = [
  {
    id: 3,
    vendorName: 'Pixel Perfect Studios',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1643264623879-bb85ea39c62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoZXIlMjBjYW1lcmElMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwODg5MTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'Sep 20, 2024',
    time: '4:00 PM',
    guests: 80,
    price: 45000,
    status: 'completed',
    location: 'Bangalore',
    bookingId: 'SWT45620',
    rated: false,
  },
];

export default function MyBookings({ onBack }: MyBookingsProps) {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const handleRateVendor = (booking: any) => {
    setSelectedBooking(booking);
    setShowRatingModal(true);
  };

  const handleSubmitRating = () => {
    setShowRatingModal(false);
    setSelectedRating(0);
    // Here would submit the rating
  };

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
          <h1 className="text-2xl text-white">My Bookings</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          {/* Upcoming Bookings */}
          <TabsContent value="upcoming" className="space-y-4">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={booking.image}
                    alt={booking.vendorName}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 mb-1">{booking.vendorName}</h3>
                        <p className="text-sm text-gray-600">{booking.category}</p>
                      </div>
                      <Badge className={
                        booking.status === 'confirmed'
                          ? 'bg-green-500'
                          : 'bg-yellow-500'
                      }>
                        {booking.status === 'confirmed' ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Confirmed
                          </>
                        ) : (
                          'Pending'
                        )}
                      </Badge>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.date} at {booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-orange-600">₹{booking.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">#{booking.bookingId}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-100 px-4 py-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                </div>
              </motion.div>
            ))}

            {bookings.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-gray-800 mb-2">No upcoming bookings</h3>
                <p className="text-gray-500">Start planning your next event!</p>
              </div>
            )}
          </TabsContent>

          {/* Past Bookings */}
          <TabsContent value="past" className="space-y-4">
            {pastBookings.map((booking) => (
              <motion.div
                key={booking.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={booking.image}
                    alt={booking.vendorName}
                    className="w-24 h-24 rounded-xl object-cover opacity-90"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 mb-1">{booking.vendorName}</h3>
                        <p className="text-sm text-gray-600">{booking.category}</p>
                      </div>
                      <Badge className="bg-gray-500">Completed</Badge>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        <span>₹{booking.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-100 px-4 py-3">
                  {!booking.rated ? (
                    <Button
                      onClick={() => handleRateVendor(booking)}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-xl"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Rate Vendor
                    </Button>
                  ) : (
                    <div className="text-center py-2">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">You rated this vendor</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate {selectedBooking?.vendorName}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <p className="text-sm text-gray-600 mb-4 text-center">
                How was your experience with this vendor?
              </p>
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedRating(i + 1)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star
                      className={`w-10 h-10 ${
                        i < selectedRating
                          ? 'text-orange-500 fill-orange-500'
                          : 'text-gray-300'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Emoji Feedback */}
              {selectedRating > 0 && (
                <motion.div
                  className="text-center mt-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <span className="text-5xl">
                    {selectedRating === 5 ? '🤩' : selectedRating === 4 ? '😊' : selectedRating === 3 ? '😐' : selectedRating === 2 ? '😕' : '😞'}
                  </span>
                </motion.div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Share your feedback (Optional)
              </label>
              <textarea
                className="w-full rounded-xl border border-gray-200 p-3 min-h-[100px] resize-none"
                placeholder="Tell us about your experience..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleSubmitRating}
              disabled={selectedRating === 0}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-xl"
            >
              Submit Rating
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
