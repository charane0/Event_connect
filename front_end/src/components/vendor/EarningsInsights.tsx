import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Download, IndianRupee, Calendar, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningsInsightsProps {
  onBack: () => void;
}

const monthlyData = [
  { month: 'Jun', earnings: 85000 },
  { month: 'Jul', earnings: 92000 },
  { month: 'Aug', earnings: 78000 },
  { month: 'Sep', earnings: 105000 },
  { month: 'Oct', earnings: 125000 },
  { month: 'Nov', earnings: 98000 },
];

const insights = [
  {
    title: 'Top month: October',
    value: '₹1.25L',
    icon: Award,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Avg. rating',
    value: '4.8⭐',
    icon: Award,
    color: 'from-orange-500 to-amber-600',
  },
  {
    title: 'Total bookings',
    value: '24',
    icon: Calendar,
    color: 'from-blue-500 to-blue-600',
  },
];

const recentTransactions = [
  {
    id: 1,
    customer: 'Priya Sharma',
    date: 'Nov 15, 2024',
    amount: 54000,
    status: 'completed',
  },
  {
    id: 2,
    customer: 'Rahul Mehta',
    date: 'Nov 10, 2024',
    amount: 25000,
    status: 'completed',
  },
  {
    id: 3,
    customer: 'Anjali Gupta',
    date: 'Nov 5, 2024',
    amount: 95000,
    status: 'pending',
  },
];

export default function EarningsInsights({ onBack }: EarningsInsightsProps) {
  const totalEarnings = monthlyData.reduce((sum, item) => sum + item.earnings, 0);

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 px-6 pt-8 pb-6 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl text-white">Earnings & Insights</h1>
        </div>

        {/* Total Earnings Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <p className="text-sm text-orange-100 mb-2">Total Earnings (Last 6 months)</p>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl text-white">₹{(totalEarnings / 100000).toFixed(2)}L</h2>
            <div className="flex items-center gap-1 text-green-300">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">+18%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Insights Cards */}
        <div className="grid grid-cols-3 gap-3">
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={insight.title}
                className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${insight.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-gray-600 mb-1">{insight.title}</p>
                <p className="text-gray-900">{insight.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Earnings Chart */}
        <Card className="border-gray-200 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle>Monthly Earnings</CardTitle>
            <Button variant="ghost" size="sm" className="text-orange-600">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '8px',
                  }}
                  formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Earnings']}
                />
                <Bar dataKey="earnings" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <h4 className="text-gray-900 mb-1">📈 Growth Opportunity</h4>
              <p className="text-sm text-gray-600">
                Your earnings have grown by 28% this quarter. Keep up the great work!
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="text-gray-900 mb-1">💡 Peak Season Alert</h4>
              <p className="text-sm text-gray-600">
                December typically sees 45% more bookings. Update your availability now!
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <h4 className="text-gray-900 mb-1">⚡ Quick Tip</h4>
              <p className="text-sm text-gray-600">
                Vendors who respond within 2 hours get 60% more bookings.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">{transaction.customer}</h4>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 mb-1">₹{transaction.amount.toLocaleString()}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Download Report */}
        <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 py-6 rounded-2xl shadow-lg">
          <Download className="w-5 h-5 mr-2" />
          Download Full Report
        </Button>
      </div>
    </div>
  );
}
