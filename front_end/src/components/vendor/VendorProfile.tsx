import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, CheckCircle, Calendar, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';
import { Badge } from '../ui/badge';

interface VendorProfileProps {
  onBack: () => void;
}

const galleryImages = [
  'https://images.unsplash.com/photo-1680342638943-847f76b7b016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBldmVudHxlbnwxfHx8fDE3NjA4MDc1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1684243920725-956d93ff391a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzYwODc3ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1521543387600-c745f8e83d77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBoYWxsfGVufDF8fHx8MTc2MDg5Njg3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
];

const packages = [
  { id: 1, name: 'Basic Package', price: 25000, description: 'Perfect for small events' },
  { id: 2, name: 'Premium Package', price: 50000, description: 'Our most popular choice' },
  { id: 3, name: 'Luxury Package', price: 100000, description: 'Complete premium service' },
];

export default function VendorProfile({ onBack }: VendorProfileProps) {
  const [profileCompletion, setProfileCompletion] = useState(75);

  const handleSave = () => {
    toast.success('Profile updated successfully! 🎉');
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
          <div className="flex-1">
            <h1 className="text-2xl text-white mb-1">Profile Management</h1>
            <div className="flex items-center gap-2">
              <Progress value={profileCompletion} className="h-2 flex-1 bg-white/20" />
              <span className="text-sm text-white">{profileCompletion}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="verification">Verify</TabsTrigger>
          </TabsList>

          {/* Basic Info */}
          <TabsContent value="basic" className="space-y-4">
            <motion.div
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-gray-900 mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    defaultValue="Royal Caterers"
                    className="rounded-xl mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    defaultValue="Catering"
                    className="rounded-xl mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    defaultValue="Mumbai, Maharashtra"
                    className="rounded-xl mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="rounded-xl mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contact@royalcaterers.com"
                    className="rounded-xl mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    defaultValue="We are a premium catering service provider with over 10 years of experience in making events memorable."
                    className="rounded-xl mt-2 min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-xl"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Gallery */}
          <TabsContent value="gallery" className="space-y-4">
            <motion.div
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Photo Gallery</h3>
                <Badge className="bg-orange-500">{galleryImages.length} photos</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {galleryImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="relative aspect-square rounded-xl overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-xl"
                      >
                        Remove
                      </Button>
                    </div>
                  </motion.div>
                ))}
                
                {/* Upload Button */}
                <motion.button
                  className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-orange-500 transition-colors flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-orange-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Upload className="w-8 h-8" />
                  <span className="text-sm">Add Photo</span>
                </motion.button>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-blue-800">
                  💡 Tip: Vendors with 6+ photos get 40% more bookings!
                </p>
              </div>
            </motion.div>
          </TabsContent>

          {/* Pricing */}
          <TabsContent value="pricing" className="space-y-4">
            <motion.div
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-gray-900 mb-4">Pricing Packages</h3>

              <div className="space-y-4">
                {packages.map((pkg, idx) => (
                  <div key={pkg.id} className="p-4 bg-gray-50 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Package {idx + 1}</Label>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Remove
                      </Button>
                    </div>
                    
                    <Input
                      defaultValue={pkg.name}
                      placeholder="Package name"
                      className="rounded-xl"
                    />
                    
                    <Input
                      type="number"
                      defaultValue={pkg.price}
                      placeholder="Price"
                      className="rounded-xl"
                    />
                    
                    <Textarea
                      defaultValue={pkg.description}
                      placeholder="Package description"
                      className="rounded-xl"
                    />
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  + Add New Package
                </Button>

                <Button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-xl"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Pricing
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Verification */}
          <TabsContent value="verification" className="space-y-4">
            <motion.div
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-gray-900 mb-4">Document Verification</h3>

              <div className="space-y-4">
                {/* Business License */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="text-gray-900">Business License</h4>
                    </div>
                    <Badge className="bg-green-500">Verified</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Document uploaded and verified</p>
                </div>

                {/* GST Certificate */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="text-gray-900">GST Certificate</h4>
                    </div>
                    <Badge className="bg-green-500">Verified</Badge>
                  </div>
                  <p className="text-sm text-gray-600">GSTIN: 27XXXXX1234X1Z5</p>
                </div>

                {/* Address Proof */}
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-yellow-600" />
                      <h4 className="text-gray-900">Address Proof</h4>
                    </div>
                    <Badge className="bg-yellow-500">Pending</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Upload address proof document</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-orange-500 text-orange-600 hover:bg-orange-50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-sm text-blue-800">
                    ✨ Complete verification to get the "Verified Vendor" badge and increase trust!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Availability Calendar */}
            <motion.div
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-gray-900 mb-4">Availability Calendar</h3>
              
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Manage your availability to help customers book accurately
                </p>
                <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-xl">
                  <Calendar className="w-4 h-4 mr-2" />
                  Update Availability
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
