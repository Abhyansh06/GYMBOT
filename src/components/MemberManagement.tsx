import React, { useState } from 'react';
import { Plus, Edit, Trash2, Phone, Mail, Calendar, User, Filter, Search, CreditCard, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const MemberManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2024-01-15',
      status: 'Active',
      program: 'Strength Training',
      avatar: null,
      membershipExpiry: '2024-03-15',
      membershipType: 'Premium',
      paymentStatus: 'Paid',
      lastPayment: '2024-01-15',
      autoRenewal: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 987-6543',
      joinDate: '2024-02-20',
      status: 'Active',
      program: 'Weight Loss',
      avatar: null,
      membershipExpiry: '2024-02-25',
      membershipType: 'Basic',
      paymentStatus: 'Expiring Soon',
      lastPayment: '2024-01-25',
      autoRenewal: false
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@example.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2024-03-10',
      status: 'Inactive',
      program: 'Bodybuilding',
      avatar: null,
      membershipExpiry: '2024-02-10',
      membershipType: 'Premium',
      paymentStatus: 'Expired',
      lastPayment: '2024-01-10',
      autoRenewal: false
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    goals: '',
    medicalConditions: '',
    emergencyContact: '',
    emergencyPhone: '',
    membershipType: '',
    membershipDuration: '',
    autoRenewal: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setMonth(today.getMonth() + parseInt(formData.membershipDuration));
    
    const newMember = {
      id: members.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      joinDate: today.toISOString().split('T')[0],
      status: 'Active',
      program: formData.program,
      avatar: null,
      membershipExpiry: expiryDate.toISOString().split('T')[0],
      membershipType: formData.membershipType,
      paymentStatus: 'Paid',
      lastPayment: today.toISOString().split('T')[0],
      autoRenewal: formData.autoRenewal
    };
    setMembers([...members, newMember]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      program: '',
      goals: '',
      medicalConditions: '',
      emergencyContact: '',
      emergencyPhone: '',
      membershipType: '',
      membershipDuration: '',
      autoRenewal: false
    });
    setShowAddForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const getMembershipStatusColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'Paid':
        return 'bg-green-500/20 text-green-400';
      case 'Expiring Soon':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Expired':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getMembershipIcon = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'Paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'Expiring Soon':
        return <Clock className="w-4 h-4" />;
      case 'Expired':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleRenewMembership = (memberId: number) => {
    setMembers(members.map(member => {
      if (member.id === memberId) {
        const today = new Date();
        const newExpiry = new Date(today);
        newExpiry.setMonth(today.getMonth() + (member.membershipType === 'Premium' ? 1 : 1));
        
        return {
          ...member,
          membershipExpiry: newExpiry.toISOString().split('T')[0],
          paymentStatus: 'Paid',
          lastPayment: today.toISOString().split('T')[0],
          status: 'Active'
        };
      }
      return member;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Member Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Membership Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{members.filter(m => m.paymentStatus === 'Paid').length}</div>
          <div className="text-blue-200 text-sm">Active Memberships</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{members.filter(m => m.paymentStatus === 'Expiring Soon').length}</div>
          <div className="text-blue-200 text-sm">Expiring Soon</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{members.filter(m => m.paymentStatus === 'Expired').length}</div>
          <div className="text-blue-200 text-sm">Expired</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">${members.filter(m => m.paymentStatus === 'Paid').length * 49.99}</div>
          <div className="text-blue-200 text-sm">Monthly Revenue</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search members..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Programs</option>
            <option value="strength">Strength Training</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="bodybuilding">Bodybuilding</option>
            <option value="cardio">Cardio</option>
          </select>
          <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
          <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Types</option>
            <option value="premium">Premium</option>
            <option value="basic">Basic</option>
          </select>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => {
          const daysUntilExpiry = getDaysUntilExpiry(member.membershipExpiry);
          const isExpired = daysUntilExpiry < 0;
          const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry >= 0;
          
          return (
            <div key={member.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{member.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getMembershipStatusColor(member.paymentStatus)}`}>
                      {getMembershipIcon(member.paymentStatus)}
                      {member.paymentStatus}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-blue-400" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-blue-200">
                  <Mail className="w-4 h-4" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <Phone className="w-4 h-4" />
                  {member.phone}
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <Calendar className="w-4 h-4" />
                  Joined: {member.joinDate}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Membership</span>
                  <span className="text-blue-200 text-sm">{member.membershipType}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-200 text-sm">Expires:</span>
                  <span className={`text-sm font-medium ${isExpired ? 'text-red-400' : isExpiringSoon ? 'text-yellow-400' : 'text-green-400'}`}>
                    {member.membershipExpiry}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200 text-sm">Days left:</span>
                  <span className={`text-sm font-medium ${isExpired ? 'text-red-400' : isExpiringSoon ? 'text-yellow-400' : 'text-green-400'}`}>
                    {isExpired ? 'Expired' : `${daysUntilExpiry} days`}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-white font-medium mb-1">Program</p>
                <p className="text-blue-200 text-sm">{member.program}</p>
              </div>

              {(isExpired || isExpiringSoon) && (
                <div className="space-y-2">
                  {isExpired && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 text-center">
                      <p className="text-red-400 text-sm font-medium">Access Restricted</p>
                      <p className="text-red-300 text-xs">Bot features disabled</p>
                    </div>
                  )}
                  {isExpiringSoon && (
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2 text-center">
                      <p className="text-yellow-400 text-sm font-medium">Renewal Reminder Sent</p>
                    </div>
                  )}
                  <button
                    onClick={() => handleRenewMembership(member.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <CreditCard className="w-3 h-3" />
                    Renew Membership
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Member Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/20 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">Add New Member</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Program</label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Program</option>
                    <option value="Strength Training">Strength Training</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Bodybuilding">Bodybuilding</option>
                    <option value="Cardio">Cardio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Membership Type</label>
                  <select
                    name="membershipType"
                    value={formData.membershipType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Basic">Basic - $29.99/month</option>
                    <option value="Premium">Premium - $49.99/month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Membership Duration</label>
                  <select
                    name="membershipDuration"
                    value={formData.membershipDuration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Duration</option>
                    <option value="1">1 Month</option>
                    <option value="3">3 Months (5% off)</option>
                    <option value="6">6 Months (10% off)</option>
                    <option value="12">12 Months (20% off)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">Fitness Goals</label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe member's fitness goals..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">Medical Conditions</label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any medical conditions or injuries..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Emergency Contact</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Emergency contact name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Emergency Phone</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Emergency contact phone"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="autoRenewal"
                  checked={formData.autoRenewal}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-blue-200">Enable auto-renewal</label>
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;