import React, { useState } from 'react';
import { Building2, User, Lock, Mail, Phone, MapPin, CreditCard, Shield, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

const ServiceProviderLogin: React.FC<LoginProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    // Service Provider Info
    providerName: '',
    providerEmail: '',
    providerPassword: '',
    providerPhone: '',
    
    // Gym Info
    gymName: '',
    gymEmail: '',
    gymPhone: '',
    gymAddress: '',
    gymCity: '',
    gymState: '',
    gymZip: '',
    
    // Subscription
    subscriptionPlan: 'basic',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });

  // Mock existing users for demo
  const mockUsers = [
    {
      id: 1,
      email: 'admin@gympro.com',
      password: 'admin123',
      role: 'service-provider',
      name: 'GymPro Admin',
      gymName: 'Service Provider Dashboard'
    },
    {
      id: 2,
      email: 'owner@fitnesshub.com',
      password: 'owner123',
      role: 'gym-owner',
      name: 'John Smith',
      gymName: 'Fitness Hub Gym',
      subscriptionStatus: 'active',
      activeClients: 150,
      monthlyFee: 1500
    }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = mockUsers.find(u => 
      u.email === loginForm.email && u.password === loginForm.password
    );
    
    if (user) {
      onLogin(user);
    } else {
      alert('Invalid credentials. Try admin@gympro.com / admin123 or owner@fitnesshub.com / owner123');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new gym owner account
    const newUser = {
      id: Date.now(),
      email: registerForm.gymEmail,
      password: registerForm.providerPassword,
      role: 'gym-owner',
      name: registerForm.providerName,
      gymName: registerForm.gymName,
      subscriptionStatus: 'active',
      activeClients: 0,
      monthlyFee: 0,
      subscriptionPlan: registerForm.subscriptionPlan
    };
    
    alert('Registration successful! You can now login with your credentials.');
    setActiveTab('login');
    setLoginForm({
      email: registerForm.gymEmail,
      password: registerForm.providerPassword
    });
  };

  const handleInputChange = (form: 'login' | 'register', field: string, value: string) => {
    if (form === 'login') {
      setLoginForm(prev => ({ ...prev, [field]: value }));
    } else {
      setRegisterForm(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Gym<span className="text-blue-400">Pro</span> <span className="text-green-400">SaaS</span>
          </h1>
          <p className="text-xl text-blue-200 mb-2">WhatsApp Bot Service Provider Platform</p>
          <p className="text-blue-300">Manage multiple gym clients with our comprehensive bot management system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Features Section */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">🚀 Platform Features</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Multi-Gym Management</h3>
                  <p className="text-blue-200 text-sm">Manage unlimited gym clients from one dashboard</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Per-Client Billing</h3>
                  <p className="text-blue-200 text-sm">₹10 per active client per month - automatic billing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Service Control</h3>
                  <p className="text-blue-200 text-sm">Automatic service blocking for non-payment</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Complete Bot Management</h3>
                  <p className="text-blue-200 text-sm">WhatsApp bot, member management, workouts & nutrition</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">💰 Pricing Model</h4>
              <p className="text-green-300 text-sm">
                <strong>₹10 per active client per month</strong><br/>
                Example: 100 active clients = ₹1,000/month<br/>
                No setup fees • No hidden charges • Pay only for active users
              </p>
            </div>
          </div>

          {/* Login/Register Form */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            {/* Tab Switcher */}
            <div className="flex bg-white/10 rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'login'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'register'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                Register Gym
              </button>
            </div>

            {activeTab === 'login' ? (
              /* Login Form */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginForm.password}
                      onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Login to Dashboard
                </button>

                <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <h4 className="text-blue-400 font-semibold mb-2">Demo Accounts</h4>
                  <div className="text-sm text-blue-300 space-y-1">
                    <p><strong>Service Provider:</strong> admin@gympro.com / admin123</p>
                    <p><strong>Gym Owner:</strong> owner@fitnesshub.com / owner123</p>
                  </div>
                </div>
              </form>
            ) : (
              /* Registration Form */
              <form onSubmit={handleRegisterSubmit} className="space-y-4 max-h-96 overflow-y-auto">
                <h2 className="text-2xl font-bold text-white mb-6">Register Your Gym</h2>
                
                {/* Service Provider Details */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">👤 Your Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={registerForm.providerName}
                        onChange={(e) => handleInputChange('register', 'providerName', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Your Email</label>
                      <input
                        type="email"
                        value={registerForm.providerEmail}
                        onChange={(e) => handleInputChange('register', 'providerEmail', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Password</label>
                      <input
                        type="password"
                        value={registerForm.providerPassword}
                        onChange={(e) => handleInputChange('register', 'providerPassword', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Your Phone</label>
                      <input
                        type="tel"
                        value={registerForm.providerPhone}
                        onChange={(e) => handleInputChange('register', 'providerPhone', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Gym Details */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">🏢 Gym Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Gym Name</label>
                      <input
                        type="text"
                        value={registerForm.gymName}
                        onChange={(e) => handleInputChange('register', 'gymName', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Gym Email</label>
                      <input
                        type="email"
                        value={registerForm.gymEmail}
                        onChange={(e) => handleInputChange('register', 'gymEmail', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">Gym Phone</label>
                      <input
                        type="tel"
                        value={registerForm.gymPhone}
                        onChange={(e) => handleInputChange('register', 'gymPhone', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-1">City</label>
                      <input
                        type="text"
                        value={registerForm.gymCity}
                        onChange={(e) => handleInputChange('register', 'gymCity', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-blue-200 mb-1">Address</label>
                      <input
                        type="text"
                        value={registerForm.gymAddress}
                        onChange={(e) => handleInputChange('register', 'gymAddress', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Subscription Plan */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">💳 Subscription Plan</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <input
                        type="radio"
                        name="subscriptionPlan"
                        value="basic"
                        checked={registerForm.subscriptionPlan === 'basic'}
                        onChange={(e) => handleInputChange('register', 'subscriptionPlan', e.target.value)}
                        className="text-green-500"
                      />
                      <div className="flex-1">
                        <div className="text-white font-medium">Pay Per Client</div>
                        <div className="text-green-300 text-sm">₹10 per active client per month</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Register Gym & Start Free Trial
                </button>

                <p className="text-xs text-blue-300 text-center">
                  By registering, you agree to our Terms of Service and Privacy Policy.<br/>
                  7-day free trial included. No credit card required.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderLogin;