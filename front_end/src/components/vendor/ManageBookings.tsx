import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Users, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';

interface ManageBookingsProps {
  onBack: () => void;
}

const newBookings = [
  {
    id: 1,
    customer: 'Priya Sharma',
    event: 'Wedding',
    package: 'Premium Package',
    date: 'Nov 15, 2025',
    time: '6:00 PM',
    guests: 100,
    amount: 54000,
    phone: '+91 98765 43210',
    email: 'priya.sharma@email.com',
  },
  {
    id: 2,
    customer: 'Rahul Mehta',
    event: 'Birthday Party',
    package: 'Basic Package',
    date: 'Nov 20, 2025',
    time: '7:00 PM',
    guests: 50,
    amount: 25000,
    phone: '+91 98765 43211',
    email: 'rahul.mehta@email.com',
  },
];

const confirmedBookings = [
  {
    id: 3,
    customer: 'Anjali Gupta',
    event: 'Anniversary',
    package: 'Luxury Package',
    date: 'Dec 1, 2025',
    time: '8:00 PM',
    guests: 80,
    amount: 95000,
    phone: '+91 98765 43212',
    email: 'anjali.gupta@email.com',
  },
];

const completedBookings = [
  {
    id: 4,
    customer: 'Vikram Singh',
    event: 'Corporate Event',
    package: 'Premium Package',
    date: 'Oct 15, 2024',
    guests: 150,
    amount: 120000,
  },
];

export default function ManageBookings({ onBack }: ManageBookingsProps) {
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const handleAccept = (booking: any) => {
    setSelectedBooking(booking);
    setShowAcceptDialog(true);
  };

  const handleReject = (booking: any) => {
    setSelectedBooking(booking);
    setShowRejectDialog(true);
  };

  const confirmAccept = () => {
    setShowAcceptDialog(false);
    // Handle accept logic
  };

  const confirmReject = () => {
    setShowRejectDialog(false);
    // Handle reject logic
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 px-6 pt-8 pb-6 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl text-white">Manage Bookings</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-6">
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="new">
              New
              {newBookings.length > 0 && (
                <Badge className="ml-2 bg-red-500">{newBookings.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {/* New Bookings */}
          <TabsContent value="new" className="space-y-4">
            {newBookings.map((booking) => (
              <motion.div
                key={booking.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-orange-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-gray-900 mb-1">{booking.customer}</h3>
                      <p className="text-sm text-gray-600">{booking.event}</p>
                    </div>
                    <Badge className="bg-orange-500">New Request</Badge>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Package</p>
                      <p className="text-gray-900">{booking.package}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Date & Time</p>
                      <p className="text-gray-900">{booking.date}</p>
                      <p className="text-gray-600">{booking.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Guests</p>
                      <p className="text-gray-900 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {booking.guests} people
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Amount</p>
                      <p className="text-orange-600">₹{booking.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl border-gray-200"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl border-gray-200"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-100 p-4 flex gap-3">
                  <Button
                    onClick={() => handleReject(booking)}
                    variant="outline"
                    className="flex-1 rounded-xl border-red-500 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleAccept(booking)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                </div>
              </motion.div>
            ))}

            {newBookings.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-gray-800 mb-2">No new bookings</h3>
                <p className="text-gray-500">New booking requests will appear here</p>
              </div>
            )}
          </TabsContent>

          {/* Confirmed Bookings */}
          <TabsContent value="confirmed" className="space-y-4">
            {confirmedBookings.map((booking) => (
              <motion.div
                key={booking.id}
                className="bg-white rounded-2xl shadow-md p-4 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900 mb-1">{booking.customer}</h3>
                    <p className="text-sm text-gray-600">{booking.event}</p>
                  </div>
                  <Badge className="bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Confirmed
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <p className="text-gray-600 mb-1">Package</p>
                    <p className="text-gray-900">{booking.package}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Date</p>
                    <p className="text-gray-900">{booking.date}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Contact Customer
                  </Button>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          {/* Completed Bookings */}
          <TabsContent value="completed" className="space-y-4">
            {completedBookings.map((booking) => (
              <motion.div
                key={booking.id}
                className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 opacity-80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.8, y: 0 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900 mb-1">{booking.customer}</h3>
                    <p className="text-sm text-gray-600">{booking.event}</p>
                  </div>
                  <Badge className="bg-gray-500">Completed</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Date</p>
                    <p className="text-gray-900">{booking.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Amount</p>
                    <p className="text-green-600">₹{booking.amount.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Accept Confirmation Dialog */}
      <Dialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Accept Booking?</DialogTitle>
            <DialogDescription>
              Are you sure you want to accept this booking request from {selectedBooking?.customer}?
            </DialogDescription>
          </DialogHeader>
          <div className="bg-green-50 rounded-xl p-4 my-4 border border-green-200">
            <p className="text-sm text-gray-700">
              Once accepted, the customer will be notified and this will be added to your confirmed bookings.
            </p>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAcceptDialog(false)}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAccept}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl"
            >
              Confirm Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Booking?</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this booking request from {selectedBooking?.customer}?
            </DialogDescription>
          </DialogHeader>
          <div className="bg-red-50 rounded-xl p-4 my-4 border border-red-200">
            <p className="text-sm text-gray-700 mb-3">
              The customer will be notified about the rejection. This action cannot be undone.
            </p>
            <textarea
              className="w-full rounded-xl border border-gray-200 p-3 min-h-[80px] resize-none text-sm"
              placeholder="Reason for rejection (optional)..."
            />
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmReject}
              className="flex-1 bg-red-500 hover:bg-red-600 rounded-xl"
            >
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
