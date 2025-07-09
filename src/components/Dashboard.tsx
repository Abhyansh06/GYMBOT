import React from 'react';
import { Users, Calendar, UtensilsCrossed, TrendingUp, Clock, Target, Award, Activity } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Members', value: '1,247', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { title: 'Active Workouts', value: '89', icon: Calendar, color: 'bg-green-500', change: '+8%' },
    { title: 'Meal Plans', value: '156', icon: UtensilsCrossed, color: 'bg-purple-500', change: '+15%' },
    { title: 'Monthly Revenue', value: '$12,450', icon: TrendingUp, color: 'bg-orange-500', change: '+23%' }
  ];

  const recentActivity = [
    { type: 'member', message: 'John Doe completed chest workout', time: '2 hours ago' },
    { type: 'meal', message: 'Sarah Johnson logged breakfast', time: '3 hours ago' },
    { type: 'workout', message: 'Mike Wilson started leg day routine', time: '4 hours ago' },
    { type: 'member', message: 'Lisa Chen joined the gym', time: '5 hours ago' }
  ];

  const upcomingSchedule = [
    { member: 'Alex Rodriguez', workout: 'Full Body Strength', time: '9:00 AM' },
    { member: 'Emma Thompson', workout: 'HIIT Cardio', time: '10:30 AM' },
    { member: 'David Kim', workout: 'Yoga Flow', time: '2:00 PM' },
    { member: 'Rachel Green', workout: 'Core Blast', time: '4:30 PM' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-blue-200 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-blue-200 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Today's Schedule</h3>
          </div>
          <div className="space-y-4">
            {upcomingSchedule.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">{schedule.member}</h4>
                  <p className="text-blue-200 text-sm">{schedule.workout}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{schedule.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Performance Metrics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-white">89%</h4>
            <p className="text-blue-200 text-sm">Member Retention</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-white">73%</h4>
            <p className="text-blue-200 text-sm">Workout Completion</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-white">91%</h4>
            <p className="text-blue-200 text-sm">Meal Plan Adherence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;