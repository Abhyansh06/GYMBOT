import React, { useState } from 'react';
import { Users, Calendar, UtensilsCrossed, BarChart3, Settings, Plus, Search, Filter, MessageSquare, Building2, CreditCard, Shield } from 'lucide-react';
import Dashboard from './components/Dashboard';
import MemberManagement from './components/MemberManagement';
import WorkoutScheduling from './components/WorkoutScheduling';
import MealPlanning from './components/MealPlanning';
import SettingsPanel from './components/SettingsPanel';
import WhatsAppBotDemo from './components/WhatsAppBotDemo';
import ServiceProviderLogin from './components/ServiceProviderLogin';
import ServiceProviderDashboard from './components/ServiceProviderDashboard';
import GymOwnerDashboard from './components/GymOwnerDashboard';
import VideoManagement from './components/VideoManagement';

function App() {
  const [currentView, setCurrentView] = useState('service-login'); // 'service-login', 'service-dashboard', 'gym-dashboard'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);

  // Service Provider Views
  if (currentView === 'service-login') {
    return <ServiceProviderLogin onLogin={(user) => {
      setCurrentUser(user);
      setCurrentView(user.role === 'service-provider' ? 'service-dashboard' : 'gym-dashboard');
    }} />;
  }

  if (currentView === 'service-dashboard') {
    return <ServiceProviderDashboard 
      onLogout={() => {
        setCurrentUser(null);
        setCurrentView('service-login');
      }}
      onSwitchToGym={(gymId) => {
        setCurrentView('gym-dashboard');
        setActiveTab('dashboard');
      }}
    />;
  }

  // Gym Owner Dashboard
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'workouts', label: 'Workouts', icon: Calendar },
    { id: 'meals', label: 'Meals', icon: UtensilsCrossed },
    { id: 'videos', label: 'Video Library', icon: MessageSquare },
    { id: 'bot-demo', label: 'Bot Demo', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <MemberManagement />;
      case 'workouts':
        return <WorkoutScheduling />;
      case 'meals':
        return <MealPlanning />;
      case 'videos':
        return <VideoManagement />;
      case 'bot-demo':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">WhatsApp Bot Client Experience</h2>
              <p className="text-blue-200">See how your clients interact with the gym bot</p>
            </div>
            <div className="flex justify-center">
              <WhatsAppBotDemo />
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Try these commands:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="text-blue-200">• "menu" - Show all options</div>
                  <div className="text-blue-200">• "my workouts" - Today's workout</div>
                  <div className="text-blue-200">• "start workout" - Begin workout</div>
                </div>
                <div className="space-y-2">
                  <div className="text-blue-200">• "schedule" - Weekly plan</div>
                  <div className="text-blue-200">• "meals" - Meal plan</div>
                  <div className="text-blue-200">• "progress" - Stats & achievements</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Gym<span className="text-blue-400">Pro</span>
              </h1>
              <p className="text-blue-200">WhatsApp Bot Management System</p>
              {currentUser && (
                <p className="text-sm text-blue-300 mt-1">
                  Logged in as: {currentUser.name} ({currentUser.gymName})
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                Quick Add
              </button>
              <button 
                onClick={() => {
                  setCurrentUser(null);
                  setCurrentView('service-login');
                }}
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
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;