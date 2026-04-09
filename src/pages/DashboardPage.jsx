import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { Users, UserPlus, Heart, CheckCircle, TrendingUp, Activity } from 'lucide-react';
import clsx from 'clsx';

const mockStats = {
  totalUsers: 0,
  activeToday: 0,
  newThisWeek: 0,
  totalMatches: 0,
  interestsSent: 0,
  interestsAccepted: 0,
};

function StatCard({ icon: Icon, label, value, color, trend }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    saffron: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={clsx('p-2.5 rounded-lg', colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-medium text-green-600">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-800">{value.toLocaleString()}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await adminApi.getDashboardStats();
        if (data.success) setStats(data.data);
      } catch (err) {
        // Use mock data until admin APIs are built
        console.log('Using placeholder stats — admin API not yet available');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome to AgraBandhan Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color="blue" />
        <StatCard icon={Activity} label="Active Today" value={stats.activeToday} color="green" />
        <StatCard icon={UserPlus} label="New This Week" value={stats.newThisWeek} color="purple" />
        <StatCard icon={Heart} label="Total Matches" value={stats.totalMatches} color="saffron" />
        <StatCard icon={Heart} label="Interests Sent" value={stats.interestsSent} color="blue" />
        <StatCard icon={CheckCircle} label="Interests Accepted" value={stats.interestsAccepted} color="green" />
      </div>

      {/* Placeholder for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Registration Trend</h3>
          <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
            Chart will render once data is available
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Gotra Distribution</h3>
          <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
            Chart will render once data is available
          </div>
        </div>
      </div>
    </div>
  );
}
