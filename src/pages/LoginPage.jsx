import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../services/api';
import { Heart, Phone, KeyRound, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.sendOtp(phoneNumber);
      setStep('otp');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(phoneNumber, otp);
      navigate('/');
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-saffron-500/20 rounded-2xl mb-4">
            <Heart className="w-8 h-8 text-saffron-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">AgraBandhan</h1>
          <p className="text-slate-400 mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            {step === 'phone' ? 'Sign in with OTP' : 'Enter verification code'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <div onSubmit={handleSendOtp}>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="relative mb-6">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  maxLength={10}
                />
              </div>
              <button
                onClick={handleSendOtp}
                disabled={loading || phoneNumber.length !== 10}
                className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          ) : (
            <div onSubmit={handleVerifyOtp}>
              <p className="text-sm text-slate-500 mb-4">
                Code sent to <span className="font-medium text-slate-700">+91 {phoneNumber}</span>
              </p>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                OTP Code
              </label>
              <div className="relative mb-6">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>
              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>
              <button
                onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                className="w-full mt-3 py-2 text-sm text-slate-500 hover:text-primary-600"
              >
                Change phone number
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Only authorized administrators can access this panel.
        </p>
      </div>
    </div>
  );
}
