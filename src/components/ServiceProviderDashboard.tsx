import React, { useState } from 'react';
import { Building2, Users, CreditCard, AlertTriangle, CheckCircle, TrendingUp, DollarSign, Calendar, Settings, Plus, Search, Filter, Eye, Ban, RefreshCw, Mail, Phone, MapPin, Clock, Shield, BarChart3 } from 'lucide-react';

interface ServiceProviderDashboardProps {
  onLogout: () => void;
  onSwitchToGym: (gymId: number) => void;
}

const ServiceProviderDashboard: React.FC<ServiceProviderDashboardProps> = ({ onLogout, onSwitchToGym }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddGym, setShowAddGym] = useState(false);

  // Mock data for registered gyms
  const [gyms, setGyms] = useState([
    {
      id: 1,
      name: 'Fitness Hub Gym',
      ownerName: 'John Smith',
      email: 'owner@fitnesshub.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      registrationDate: '2024-01-15',
      subscriptionStatus: 'active',
      activeClients: 150,
      monthlyFee: 1500,
      lastPayment: '2024-01-15',
      nextBilling: '2024-02-15',
      totalRevenue: 4500,
      serviceStatus: 'active',
      botConnected: true
    },
    {
      id: 2,
      name: 'PowerLift Gym',
      ownerName: 'Sarah Johnson',
      email: 'sarah@powerlift.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      registrationDate: '2024-02-01',
      subscriptionStatus: 'overdue',
      activeClients: 89,
      monthlyFee: 890,
      lastPayment: '2024-01-01',
      nextBilling: '2024-02-01',
      totalRevenue: 890,
      serviceStatus: 'suspended',
      botConnected: false
    },
    {
      id: 3,
      name: 'Elite Fitness Center',
      ownerName: 'Mike Wilson',
      email: 'mike@elitefitness.com',
      phone: '+1 (555) 456-7890',
      address: '789 Pine St, Chicago, IL 60601',
      registrationDate: '2024-01-20',
      subscriptionStatus: 'active',
      activeClients: 203,
      monthlyFee: 2030,
      lastPayment: '2024-01-20',
      nextBilling: '2024-02-20',
      totalRevenue: 2030,
      serviceStatus: 'active',
      botConnected: true
    }
  ]);

  const [newGymForm, setNewGymForm] = useState({
    name: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    subscriptionPlan: 'basic'
  });

  // Calculate totals
  const totalGyms = gyms.length;
  const activeGyms = gyms.filter(g => g.subscriptionStatus === 'active').length;
  const totalClients = gyms.reduce((sum, gym) => sum + gym.activeClients, 0);
  const monthlyRevenue = gyms.filter(g => g.subscriptionStatus === 'active').reduce((sum, gym) => sum + gym.monthlyFee, 0);
  const overdueGyms = gyms.filter(g => g.subscriptionStatus === 'overdue').length;

  const handleSuspendService = (gymId: number) => {
    setGyms(gyms.map(gym => 
      gym.id === gymId 
        ? { ...gym, serviceStatus: 'suspended', botConnected: false }
        : gym
    ));
  };

  const handleActivateService = (gymId: number) => {
    setGyms(gyms.map(gym => 
      gym.id === gymId 
        ? { ...gym, serviceStatus: 'active', botConnected: true, subscriptionStatus: 'active' }
        : gym
    ));
  };

  const handleAddGym = (e: React.FormEvent) => {
    e.preventDefault();
    const newGym = {
      id: Date.now(),
      name: newGymForm.name,
      ownerName: newGymForm.ownerName,
      email: newGymForm.email,
      phone: newGymForm.phone,
      address: `${newGymForm.address}, ${newGymForm.city}, ${newGymForm.state}`,
      registrationDate: new Date().toISOString().split('T')[0],
      subscriptionStatus: 'active' as const,
      activeClients: 0,
      monthlyFee: 0,
      lastPayment: new Date().toISOString().split('T')[0],
      nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalRevenue: 0,
      serviceStatus: 'active' as const,
      botConnected: true
    };
    
    setGyms([...gyms, newGym]);
    setNewGymForm({
      name: '',
      ownerName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      subscriptionPlan: 'basic'
    });
    setShowAddGym(false);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{totalGyms}</h3>
          <p className="text-blue-200 text-sm">Total Gyms</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{activeGyms}</h3>
          <p className="text-blue-200 text-sm">Active Gyms</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{totalClients}</h3>
          <p className="text-blue-200 text-sm">Total Clients</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-600">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">₹{monthlyRevenue.toLocaleString()}</h3>
          <p className="text-blue-200 text-sm">Monthly Revenue</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-500">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{overdueGyms}</h3>
          <p className="text-blue-200 text-sm">Overdue Payments</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white text-sm">Elite Fitness Center payment received</p>
                <p className="text-blue-200 text-xs">₹2,030 • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white text-sm">New gym registered: Fitness Hub Gym</p>
                <p className="text-blue-200 text-xs">150 clients • 5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white text-sm">PowerLift Gym service suspended</p>
                <p className="text-blue-200 text-xs">Payment overdue • 1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Revenue Breakdown</h3>
          <div className="space-y-4">
            {gyms.filter(g => g.subscriptionStatus === 'active').map(gym => (
              <div key={gym.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">{gym.name}</p>
                  <p className="text-blue-200 text-sm">{gym.activeClients} clients</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">₹{gym.monthlyFee}</p>
                  <p className="text-blue-200 text-xs">monthly</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGymManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gym Management</h2>
        <button
          onClick={() => setShowAddGym(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Gym
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search gyms..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="overdue">Overdue</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Gyms List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {gyms.map((gym) => (
          <div key={gym.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{gym.name}</h3>
                <p className="text-blue-200">{gym.ownerName}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  gym.subscriptionStatus === 'active' ? 'bg-green-500/20 text-green-400' :
                  gym.subscriptionStatus === 'overdue' ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {gym.subscriptionStatus.toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  gym.serviceStatus === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {gym.serviceStatus === 'active' ? '🟢' : '🔴'}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <Mail className="w-4 h-4" />
                {gym.email}
              </div>
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <Phone className="w-4 h-4" />
                {gym.phone}
              </div>
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <MapPin className="w-4 h-4" />
                {gym.address}
              </div>
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <Calendar className="w-4 h-4" />
                Registered: {gym.registrationDate}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center bg-white/5 rounded-lg p-3">
                <div className="text-xl font-bold text-white">{gym.activeClients}</div>
                <div className="text-blue-200 text-xs">Active Clients</div>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3">
                <div className="text-xl font-bold text-green-400">₹{gym.monthlyFee}</div>
                <div className="text-blue-200 text-xs">Monthly Fee</div>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3">
                <div className="text-xl font-bold text-blue-400">₹{gym.totalRevenue}</div>
                <div className="text-blue-200 text-xs">Total Revenue</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white text-sm font-medium">WhatsApp Bot</p>
                <p className={`text-xs ${gym.botConnected ? 'text-green-400' : 'text-red-400'}`}>
                  {gym.botConnected ? 'Connected & Active' : 'Disconnected'}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full ${gym.botConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onSwitchToGym(gym.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
              >
                <Eye className="w-3 h-3" />
                View Dashboard
              </button>
              
              {gym.serviceStatus === 'active' ? (
                <button
                  onClick={() => handleSuspendService(gym.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center gap-1"
                >
                  <Ban className="w-3 h-3" />
                  Suspend
                </button>
              ) : (
                <button
                  onClick={() => handleActivateService(gym.id)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Activate
                </button>
              )}
            </div>

            {gym.subscriptionStatus === 'overdue' && (
              <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Payment overdue since {gym.nextBilling}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Gym Modal */}
      {showAddGym && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/20 rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-xl font-bold text-white mb-6">Add New Gym</h3>
            
            <form onSubmit={handleAddGym} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Gym Name</label>
                  <input
                    type="text"
                    value={newGymForm.name}
                    onChange={(e) => setNewGymForm({...newGymForm, name: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Owner Name</label>
                  <input
                    type="text"
                    value={newGymForm.ownerName}
                    onChange={(e) => setNewGymForm({...newGymForm, ownerName: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Email</label>
                  <input
                    type="email"
                    value={newGymForm.email}
                    onChange={(e) => setNewGymForm({...newGymForm, email: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newGymForm.phone}
                    onChange={(e) => setNewGymForm({...newGymForm, phone: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Address</label>
                  <input
                    type="text"
                    value={newGymForm.address}
                    onChange={(e) => setNewGymForm({...newGymForm, address: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">City</label>
                  <input
                    type="text"
                    value={newGymForm.city}
                    onChange={(e) => setNewGymForm({...newGymForm, city: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddGym(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Add Gym
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'gyms', label: 'Gym Management', icon: Building2 },
    { id: 'billing', label: 'Billing & Revenue', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Gym<span className="text-blue-400">Pro</span> <span className="text-green-400">Service Provider</span>
              </h1>
              <p className="text-blue-200">Multi-Gym WhatsApp Bot Management Platform</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white font-semibold">₹{monthlyRevenue.toLocaleString()}</div>
                <div className="text-blue-200 text-sm">Monthly Revenue</div>
              </div>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="min-h-[600px]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'gyms' && renderGymManagement()}
          {activeTab === 'billing' && (
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Billing & Revenue Management</h2>
              <p className="text-blue-200">Coming soon...</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Service Provider Settings</h2>
              <p className="text-blue-200">Coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;