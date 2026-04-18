import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, Building, User, MapPin, Briefcase, FileText, Camera, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';

interface VendorOnboardingProps {
  onComplete: () => void;
  onBack: () => void;
}

const categories = [
  'Catering',
  'Decoration',
  'Photography',
  'Videography',
  'Venues',
  'DJ & Music',
  'Makeup & Beauty',
  'Wedding Planning',
  'Transportation',
  'Entertainment',
];

export default function VendorOnboarding({ onComplete, onBack }: VendorOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    category: '',
    yearsExperience: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    address: '',
    pincode: '',
    gstin: '',
    businessLicense: '',
    description: '',
    servicesOffered: [] as string[],
    portfolioImages: [] as string[],
    termsAccepted: false,
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
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

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
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
            <h1 className="text-2xl text-white mb-1">Vendor Registration</h1>
            <p className="text-sm text-orange-100">Step {step} of {totalSteps}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-2 bg-white/20" />
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Step 1: Business Information */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-50 rounded-3xl flex items-center justify-center border border-orange-100/50">
                <Building className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Business Details</h2>
                <p className="text-sm text-gray-600">Tell us about your business</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100/70 space-y-4">
              <div>
                <Label htmlFor="businessName" className="text-gray-700 mb-2">
                  Business Name *
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => updateFormData('businessName', e.target.value)}
                  placeholder="e.g., Royal Caterers"
                  className="rounded-3xl mt-2 border-gray-200/80"
                />
              </div>

              <div>
                <Label htmlFor="ownerName" className="text-gray-700 mb-2">
                  Owner / Contact Person Name *
                </Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => updateFormData('ownerName', e.target.value)}
                  placeholder="Enter full name"
                  className="rounded-3xl mt-2 border-gray-200/80"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-gray-700 mb-2">
                  Business Category *
                </Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                  <SelectTrigger className="rounded-3xl mt-2 border-gray-200/80">
                    <SelectValue placeholder="Select your service category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="yearsExperience" className="text-gray-700 mb-2">
                  Years of Experience *
                </Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => updateFormData('yearsExperience', e.target.value)}
                  placeholder="e.g., 5"
                  className="rounded-3xl mt-2 border-gray-200/80"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-700 mb-2">
                  Business Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Describe your business, services, and what makes you unique..."
                  className="rounded-3xl mt-2 min-h-[120px] border-gray-200/80"
                />
              </div>

              <div className="bg-blue-50/50 rounded-3xl p-4 border border-blue-100/50">
                <p className="text-sm text-blue-800">
                  💡 A detailed description helps customers understand your services better and increases bookings!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-50 rounded-3xl flex items-center justify-center border border-orange-100/50">
                <Phone className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Contact Information</h2>
                <p className="text-sm text-gray-600">How can customers reach you?</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100/70 space-y-4">
              <div>
                <Label htmlFor="phone" className="text-gray-700 mb-2">
                  Phone Number *
                </Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="rounded-3xl pl-11 border-gray-200/80"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 mb-2">
                  Email Address *
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className="rounded-3xl pl-11 border-gray-200/80"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-gray-700 mb-2">
                  Business Address *
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  placeholder="Enter complete business address"
                  className="rounded-3xl mt-2 min-h-[80px] border-gray-200/80"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city" className="text-gray-700 mb-2">
                    City *
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    placeholder="Mumbai"
                    className="rounded-3xl mt-2 border-gray-200/80"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-gray-700 mb-2">
                    State *
                  </Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                    placeholder="Maharashtra"
                    className="rounded-3xl mt-2 border-gray-200/80"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pincode" className="text-gray-700 mb-2">
                  Pincode *
                </Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => updateFormData('pincode', e.target.value)}
                  placeholder="400001"
                  className="rounded-3xl mt-2 border-gray-200/80"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Legal & Tax Information */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-50 rounded-3xl flex items-center justify-center border border-orange-100/50">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Legal Documents</h2>
                <p className="text-sm text-gray-600">Upload your business documents</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100/70 space-y-6">
              <div>
                <Label htmlFor="gstin" className="text-gray-700 mb-2">
                  GSTIN (Optional)
                </Label>
                <Input
                  id="gstin"
                  value={formData.gstin}
                  onChange={(e) => updateFormData('gstin', e.target.value)}
                  placeholder="e.g., 27XXXXX1234X1Z5"
                  className="rounded-3xl mt-2 border-gray-200/80"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter if you have GST registration
                </p>
              </div>

              <div>
                <Label className="text-gray-700 mb-2">
                  Business License / Registration *
                </Label>
                <div className="mt-2 border-2 border-dashed border-gray-200 rounded-3xl p-6 text-center hover:border-orange-300 transition-colors cursor-pointer bg-gray-50/50">
                  <Upload className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-900 mb-1">Upload Business License</p>
                  <p className="text-xs text-gray-500 mb-4">
                    PDF, JPG or PNG (Max 5MB)
                  </p>
                  <div className="inline-flex items-center px-6 py-2 rounded-full bg-white border border-orange-200 text-orange-600 shadow-sm hover:shadow transition-all cursor-pointer">
                    Choose File
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-gray-700 mb-2">
                  Additional Documents (Optional)
                </Label>
                <div className="mt-2 border-2 border-dashed border-gray-200 rounded-3xl p-6 text-center hover:border-orange-300 transition-colors cursor-pointer bg-gray-50/50">
                  <Upload className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-900 mb-1">Upload Additional Documents</p>
                  <p className="text-xs text-gray-500 mb-4">
                    GST Certificate, Pan Card, etc.
                  </p>
                  <div className="inline-flex items-center px-6 py-2 rounded-full bg-white border border-orange-200 text-orange-600 shadow-sm hover:shadow transition-all cursor-pointer">
                    Choose File
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/50 rounded-3xl p-4 border border-amber-100/50">
                <p className="text-sm text-amber-800">
                  ⚠️ All documents will be manually verified by our team. This ensures a trusted platform for customers.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Portfolio & Services */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-50 rounded-3xl flex items-center justify-center border border-orange-100/50">
                <Camera className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Portfolio & Services</h2>
                <p className="text-sm text-gray-600">Showcase your work</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100/70 space-y-6">
              <div>
                <Label className="text-gray-700 mb-3">
                  Upload Portfolio Images *
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((idx) => (
                    <div
                      key={idx}
                      className="aspect-square border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-300 transition-colors bg-gray-50/50"
                    >
                      <Upload className="w-8 h-8 text-gray-300 mb-2" />
                      <span className="text-xs text-gray-500">Upload</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Upload at least 3 images of your past work. High-quality images increase trust!
                </p>
              </div>

              <div>
                <Label className="text-gray-700 mb-3">
                  Services You Offer *
                </Label>
                <div className="space-y-2 mt-2">
                  {[
                    'Event Planning',
                    'On-site Coordination',
                    'Custom Packages',
                    'Premium Service',
                    'Budget-friendly Options',
                    'Emergency Support',
                  ].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox id={service} />
                      <label
                        htmlFor={service}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50/50 rounded-3xl p-4 border border-green-100/50">
                <p className="text-sm text-green-800">
                  ✨ Pro Tip: Vendors with complete portfolios get 3x more bookings!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Review & Submit */}
        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-50 rounded-3xl flex items-center justify-center border border-orange-100/50">
                <CheckCircle className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Review & Submit</h2>
                <p className="text-sm text-gray-600">Verify your information</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Business Info */}
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100/70">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-orange-500" />
                  Business Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business Name:</span>
                    <span className="text-gray-900">{formData.businessName || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Owner:</span>
                    <span className="text-gray-900">{formData.ownerName || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900">{formData.category || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="text-gray-900">{formData.yearsExperience || '-'} years</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100/70">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-orange-500" />
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-900">{formData.phone || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-900">{formData.email || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="text-gray-900">{formData.city || '-'}, {formData.state || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100/70">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => updateFormData('termsAccepted', checked)}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                    I agree to the{' '}
                    <span className="text-orange-600">Terms & Conditions</span> and{' '}
                    <span className="text-orange-600">Privacy Policy</span>. I confirm that all the information provided is accurate and I understand that my application will be manually reviewed.
                  </label>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100/50">
                <h4 className="text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  What happens next?
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span>1️⃣</span>
                    <span>Your application will be reviewed by our team within 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>2️⃣</span>
                    <span>We'll verify your documents and contact information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>3️⃣</span>
                    <span>Once approved, you'll receive an email confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>4️⃣</span>
                    <span>You can then access your vendor dashboard and start receiving bookings!</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-10">
        <Button
          onClick={handleNext}
          disabled={step === 5 && !formData.termsAccepted}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 py-6 rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === 5 ? 'Submit Application' : 'Continue'}
          {step !== 5 && <ArrowRight className="w-5 h-5 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
