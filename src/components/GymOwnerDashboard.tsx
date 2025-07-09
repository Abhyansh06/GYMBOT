import React from 'react';
import { AlertTriangle, CreditCard, Lock, CheckCircle, Clock, Users, DollarSign } from 'lucide-react';

interface GymOwnerDashboardProps {
  gymData: any;
  onLogout: () => void;
}

const GymOwnerDashboard: React.FC<GymOwnerDashboardProps> = ({ gymData, onLogout }) => {
  // Mock subscription data
  const subscriptionData = {
    status: 'active', // 'active', 'overdue', 'suspended'
    activeClients: 150,
    monthlyFee: 1500,
    lastPayment: '2024-01-15',
    nextBilling: '2024-02-15',
    daysUntilBilling: 5,
    serviceStatus: 'active',
    botConnected: true
  };

  const isOverdue = subscriptionData.status === 'overdue';
  const isSuspended = subscriptionData.status === 'suspended';
  const isExpiringSoon = subscriptionData.daysUntilBilling <= 3;

  if (isSuspended) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-slate-900 to-red-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center">
            <div className="bg-red-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">Service Suspended</h1>
            <p className="text-red-200 mb-6">
              Your GymPro service has been suspended due to overdue payment.
            </p>
            
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 mb-6">
              <h3 className="text-red-400 font-semibold mb-4">Account Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-red-300">Outstanding Amount</div>
                  <div className="text-white font-semibold">₹{subscriptionData.monthlyFee}</div>
                </div>
                <div>
                  <div className="text-red-300">Due Since</div>
                  <div className="text-white font-semibold">{subscriptionData.nextBilling}</div>
                </div>
                <div>
                  <div className="text-red-300">Active Clients</div>
                  <div className="text-white font-semibold">{subscriptionData.activeClients}</div>
                </div>
                <div>
                  <div className="text-red-300">Service Status</div>
                  <div className="text-red-400 font-semibold">SUSPENDED</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Pay Now & Restore Service
              </button>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                Contact Support
              </button>
              
              <button
                onClick={onLogout}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Subscription Status Banner */}
        {(isOverdue || isExpiringSoon) && (
          <div className={`mb-6 p-4 rounded-lg border ${
            isOverdue ? 'bg-red-500/20 border-red-500/30' : 'bg-yellow-500/20 border-yellow-500/30'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className={`w-6 h-6 ${isOverdue ? 'text-red-400' : 'text-yellow-400'}`} />
                <div>
                  <h3 className={`font-semibold ${isOverdue ? 'text-red-400' : 'text-yellow-400'}`}>
                    {isOverdue ? 'Payment Overdue' : 'Payment Due Soon'}
                  </h3>
                  <p className={`text-sm ${isOverdue ? 'text-red-300' : 'text-yellow-300'}`}>
                    {isOverdue 
                      ? `Payment of ₹${subscriptionData.monthlyFee} is overdue since ${subscriptionData.nextBilling}`
                      : `Next payment of ₹${subscriptionData.monthlyFee} due in ${subscriptionData.daysUntilBilling} days`
                    }
                  </p>
                </div>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Pay Now
              </button>
            </div>
          </div>
        )}

        {/* Subscription Overview */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Subscription Overview</h2>
                <p className="text-blue-200">GymPro WhatsApp Bot Service</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${subscriptionData.botConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-white text-sm">
                  {subscriptionData.botConnected ? 'Service Active' : 'Service Inactive'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">{subscriptionData.activeClients}</div>
                <div className="text-blue-200 text-sm">Active Clients</div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">₹{subscriptionData.monthlyFee}</div>
                <div className="text-blue-200 text-sm">Monthly Fee</div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white">{subscriptionData.daysUntilBilling}</div>
                <div className="text-blue-200 text-sm">Days Until Billing</div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  {subscriptionData.status === 'active' ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  )}
                </div>
                <div className={`text-lg font-bold ${
                  subscriptionData.status === 'active' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {subscriptionData.status.toUpperCase()}
                </div>
                <div className="text-blue-200 text-sm">Status</div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Billing Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Rate per client</span>
                <span className="text-white font-semibold">₹10/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Active clients</span>
                <span className="text-white font-semibold">{subscriptionData.activeClients}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Monthly total</span>
                <span className="text-white font-semibold">₹{subscriptionData.monthlyFee}</span>
              </div>
              <hr className="border-white/20" />
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Last payment</span>
                <span className="text-white font-semibold">{subscriptionData.lastPayment}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Next billing</span>
                <span className="text-white font-semibold">{subscriptionData.nextBilling}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Service Features</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">WhatsApp Bot Integration</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Member Management System</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Workout Scheduling</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Nutrition Planning</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">Progress Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">24/7 AI Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Access Gym Dashboard
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Manage Billing
          </button>
          <button
            onClick={onLogout}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default GymOwnerDashboard;