import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Users, Package, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Progress } from '../ui/progress';
import { format } from 'date-fns';

interface BookingFlowProps {
  vendor: any;
  onBack: () => void;
  onComplete: () => void;
}

const packages = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: 25000,
    features: ['Standard Service', '50 Guests', 'Basic Decoration', '4 Hours'],
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: 50000,
    features: ['Premium Service', '100 Guests', 'Premium Decoration', '6 Hours', 'Photography'],
    recommended: true,
  },
  {
    id: 'luxury',
    name: 'Luxury Package',
    price: 100000,
    features: ['Luxury Service', '200 Guests', 'Luxury Decoration', '8 Hours', 'Photography', 'Videography', 'Live Music'],
  },
];

export default function BookingFlow({ vendor, onBack, onComplete }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [date, setDate] = useState<Date>();
  const [guestCount, setGuestCount] = useState('100');

  const progress = (step / 4) * 100;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const selectedPkg = packages.find(p => p.id === selectedPackage);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 px-6 pt-8 pb-6 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handlePrevious}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl text-white mb-1">Book {vendor.name}</h1>
            <p className="text-sm text-orange-100">Step {step} of 4</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-2 bg-white/20" />
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Step 1: Select Package */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Select Package</h2>
                <p className="text-sm text-gray-600">Choose the package that suits you best</p>
              </div>
            </div>

            <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
              <div className="space-y-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="relative">
                    {pkg.recommended && (
                      <div className="absolute -top-3 right-4 z-10">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs">
                          ⭐ Recommended
                        </div>
                      </div>
                    )}
                    <label
                      htmlFor={pkg.id}
                      className={`flex items-start gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                        selectedPackage === pkg.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <RadioGroupItem value={pkg.id} id={pkg.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-gray-900">{pkg.name}</h3>
                          <span className="text-xl text-orange-600">₹{pkg.price.toLocaleString()}</span>
                        </div>
                        <div className="space-y-1">
                          {pkg.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <Check className="w-4 h-4 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        )}

        {/* Step 2: Choose Date & Time */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Choose Date & Time</h2>
                <p className="text-sm text-gray-600">Select your event date</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-gray-700 mb-2">Event Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-xl py-6 border-gray-200"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      {date ? format(date, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="time" className="text-gray-700 mb-2">Event Time</Label>
                <Input
                  id="time"
                  type="time"
                  className="rounded-xl py-6"
                  defaultValue="18:00"
                />
              </div>

              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <p className="text-sm text-orange-800">
                  💡 Tip: Book at least 30 days in advance for better availability and discounts!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Guest Count */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Guest Count</h2>
                <p className="text-sm text-gray-600">How many guests are you expecting?</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="guests" className="text-gray-700 mb-2">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="rounded-xl py-6"
                  placeholder="Enter guest count"
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-gray-800 mb-3">Guest Count Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Adults</span>
                    <span className="text-gray-900">{Math.floor(parseInt(guestCount || '0') * 0.7)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Children</span>
                    <span className="text-gray-900">{Math.floor(parseInt(guestCount || '0') * 0.3)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                    <span className="text-gray-900">Total Guests</span>
                    <span className="text-orange-600">{guestCount}</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="special" className="text-gray-700 mb-2">Special Requirements (Optional)</Label>
                <textarea
                  id="special"
                  className="w-full rounded-xl border border-gray-200 p-4 min-h-[100px] resize-none"
                  placeholder="Any special dietary requirements, allergies, or preferences..."
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Review & Confirm */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Review Booking</h2>
                <p className="text-sm text-gray-600">Confirm your booking details</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Vendor Card */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex gap-4">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{vendor.name}</h3>
                    <p className="text-sm text-gray-600">{vendor.category}</p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <h3 className="text-gray-900">Booking Details</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package</span>
                    <span className="text-gray-900">{selectedPkg?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="text-gray-900">{date ? format(date, 'PPP') : 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests</span>
                    <span className="text-gray-900">{guestCount} people</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <h3 className="text-gray-900">Price Breakdown</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package Price</span>
                    <span className="text-gray-900">₹{selectedPkg?.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="text-gray-900">₹{((selectedPkg?.price || 0) * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Early Bird Discount</span>
                    <span>-₹{((selectedPkg?.price || 0) * 0.1).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between">
                    <span className="text-gray-900">Total Amount</span>
                    <span className="text-2xl text-orange-600">
                      ₹{((selectedPkg?.price || 0) * 1.08).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-10">
        <Button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 py-6 rounded-2xl"
        >
          {step === 4 ? 'Proceed to Payment' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
