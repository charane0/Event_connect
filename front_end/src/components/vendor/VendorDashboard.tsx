import { motion } from 'motion/react';
import { Settings, TrendingUp, IndianRupee, Calendar, Star, Users, Award, ArrowUpRight, MessageCircle, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import ChatbotButton from '../common/ChatbotButton';

interface VendorDashboardProps {
  onNavigateBookings: () => void;
  onNavigateProfile: () => void;
  onNavigateEarnings: () => void;
  onNavigateMessages: () => void;
  onBack?: () => void;
}

const stats = [
  {
    title: 'Total Bookings',
    value: '24',
    change: '+12%',
    icon: Calendar,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Total Earnings',
    value: '₹12.5L',
    change: '+28%',
    icon: IndianRupee,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Avg. Rating',
    value: '4.8',
    change: '+0.3',
    icon: Star,
    color: 'from-orange-500 to-amber-600',
  },
  {
    title: 'Profile Views',
    value: '1.2K',
    change: '+45%',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
  },
];

const insights = [
  {
    id: 1,
    title: 'You\'re trending this month! 📈',
    description: 'Your bookings increased by 35% compared to last month.',
    type: 'success',
  },
  {
    id: 2,
    title: 'Peak season approaching',
    description: 'December is your busiest month. Update availability now!',
    type: 'warning',
  },
  {
    id: 3,
    title: 'Complete your profile',
    description: 'Add 3 more photos to increase bookings by 40%.',
    type: 'info',
  },
];

const recentBookings = [
  {
    id: 1,
    customer: 'Priya Sharma',
    event: 'Wedding',
    date: 'Nov 15, 2025',
    amount: 54000,
    status: 'confirmed',
  },
  {
    id: 2,
    customer: 'Rahul Mehta',
    event: 'Birthday Party',
    date: 'Nov 20, 2025',
    amount: 35000,
    status: 'pending',
  },
];

export default function VendorDashboard({ onNavigateBookings, onNavigateProfile, onNavigateEarnings, onNavigateMessages, onBack }: VendorDashboardProps) {
  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <ChatbotButton />

      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 px-6 pt-8 pb-6">
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
              <h1 className="text-2xl text-white mb-1">Welcome, Royal Caterers 👋</h1>
              <p className="text-sm text-orange-100">Here's your business overview</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateMessages}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors relative"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                4
              </span>
            </button>
            <button
              onClick={onNavigateBookings}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors relative"
            >
              <Calendar className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button
              onClick={onNavigateProfile}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-orange-100 mb-1">{stat.title}</p>
                <div className="flex items-end justify-between">
                  <span className="text-2xl text-white">{stat.value}</span>
                  <span className="text-xs text-green-300 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Recent Bookings */}
        <Card className="border-gray-200 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle>Recent Bookings</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onNavigateBookings}
              className="text-orange-600"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">{booking.customer}</h4>
                  <p className="text-sm text-gray-600">{booking.event} • {booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 mb-1">₹{booking.amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button
              onClick={onNavigateBookings}
              variant="outline"
              className="h-20 flex-col gap-2 rounded-xl border-orange-200 hover:bg-orange-50 relative"
            >
              <Calendar className="w-6 h-6 text-orange-600" />
              <span className="text-sm">Manage Bookings</span>
              <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
            <Button
              onClick={onNavigateMessages}
              variant="outline"
              className="h-20 flex-col gap-2 rounded-xl border-orange-200 hover:bg-orange-50 relative"
            >
              <MessageCircle className="w-6 h-6 text-orange-600" />
              <span className="text-sm">Messages</span>
              <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                4
              </span>
            </Button>
            <Button
              onClick={onNavigateEarnings}
              variant="outline"
              className="h-20 flex-col gap-2 rounded-xl border-orange-200 hover:bg-orange-50"
            >
              <IndianRupee className="w-6 h-6 text-orange-600" />
              <span className="text-sm">View Earnings</span>
            </Button>
            <Button
              onClick={onNavigateProfile}
              variant="outline"
              className="h-20 flex-col gap-2 rounded-xl border-orange-200 hover:bg-orange-50"
            >
              <Settings className="w-6 h-6 text-orange-600" />
              <span className="text-sm">Edit Profile</span>
            </Button>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl text-gray-800">AI Insights</h2>
          </div>
          <div className="space-y-3">
            {insights.map((insight) => (
              <motion.div
                key={insight.id}
                className={`p-4 rounded-2xl border ${
                  insight.type === 'success'
                    ? 'bg-green-50 border-green-200'
                    : insight.type === 'warning'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-gray-900 mb-1">{insight.title}</h3>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
