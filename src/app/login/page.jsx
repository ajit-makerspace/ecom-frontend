'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAdminData } from '@/context/AdminDataContext';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { refreshData, addToast } = useAdminData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-fill Super Admin Credentials
  const fillSuperAdmin = () => {
    setEmail('superadmin@aura.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email ? email.toLowerCase().trim() : '';
    const cleanPassword = password ? password.trim() : '';

    if (!cleanEmail || !cleanPassword) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');

      const res = await api.login(cleanEmail, cleanPassword);

      if (res.success && res.token) {
        addToast('success', 'Welcome Back!', `Logged in as ${res.user?.name || 'Super Admin'}`);
        await refreshData();
        router.push('/');
      } else {
        setErrorMsg(res.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'Failed to authenticate. Please verify backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10 relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Admin Portal Login
          </h1>
          <p className="text-xs text-slate-500">
            Enter your Super Admin credentials to access store control panel.
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          {/* Email Input */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="superadmin@aura.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all text-xs"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-700">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-slate-600 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Keep me signed in</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Sign In to Dashboard <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fill Shortcut Card */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <div className="text-[11px] truncate">
                <span className="font-semibold text-slate-900 block">Super Admin Demo Credentials</span>
                <span className="text-slate-500 font-mono text-[10px]">superadmin@aura.com / admin123</span>
              </div>
            </div>

            <button
              type="button"
              onClick={fillSuperAdmin}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[10px] shrink-0 transition-all shadow-xs"
            >
              Fill Credentials
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-center text-slate-400">
          Protected by JWT Role Authorization (user_type = 1 Super Admin)
        </p>
      </div>
    </div>
  );
}
